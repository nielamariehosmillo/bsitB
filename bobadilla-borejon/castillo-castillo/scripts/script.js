const PROJECT_URL = "https://zzivlqstynxhbfabxhpi.supabase.co"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6aXZscXN0eW54aGJmYWJ4aHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ0MDE5NzAsImV4cCI6MTk2OTk3Nzk3MH0.wntGDWfy7wcuhepHw2XwbInty25vUG_6AI4U4GsJTKg"


// Create a single supabase client for interacting with your database 
const connection = supabase.createClient(PROJECT_URL,API_KEY)

async function saveImage(){
  
  let fname = $('#first-name').val();
  let lname = $('#last-name').val();
  let username = $('#username').val();
  let pic = $('#profile-pic').prop('files');
  let fileName = fname.replace(" ","").toLowerCase() + "_" +lname.replace(" ","").toLowerCase();

  const { data, error } = await connection.storage.from('images')
  .upload(`public/${fileName}.jpg`, pic[0], {
    upsert: true
  })
 
  if(data) {      
    
    console.log(error)
    //picPath = `${PROJECT}/storage/v1/object/public/${data["Key"]}`
    picPath = `${PROJECT_URL}/storage/v1/object/public/${data["Key"]}`
    saveStudent(fname,lname,username,picPath)

  }
  if(error) {
    console.log(error)
  }

}
async function saveStudent(fname, lname, username,picPath){

  const { data, error } = await connection.from("students").insert({
    first_name: fname,
    last_name: lname,
    user_name: username,
    profile_pic: picPath
})
  if(data) {
    console.log(data)
    //getStudent();

  }
  if(error) {
    console.log(error)
    //return null

  }

}

async function getStudents() {
  $('#students-table').show();
  let tbody = $("#tbody");
  let loading = $("#loading");
  let tr = "";
  loading.text("Loading....")
  const { data, error } = await connection.from("students").select("*");
  if (data) {
      for (var i in data) {
          tr += `<tr>
            <td>${data[i].id}</td>
            <td>${data[i].first_name}</td>
            <td>${data[i].last_name}</td>
            <td>${data[i].user_name}</td>
            <td>${data[i].gender}</td>
            <td><img src='${data[i].profile_pic}' height='100' width='100' ></td>
            </tr>`;
            }
      tbody.html(tr);
      loading.text("")

  }

}
async function getStudentsByGender(gender) {
  $('#students-table').show();
  let tbody = $("#tbody");
  let loading = $("#loading");
  let tr = "";
  loading.text("Loading....")
  var response = null
  if (gender != undefined || gender != null){
    response = await connection.from("students").select("*").eq('gender',gender);
  }else{
    response = await connection.from("students").select("*");
  }
  if (response.data) {
      for (var i in response.data) {
          tr += `<tr>
            <td>${response.data[i].id}</td>
            <td>${response.data[i].first_name}</td>
            <td>${response.data[i].last_name}</td>
            <td>${response.data[i].user_name}</td>
            <td>${response.data[i].gender}</td>
            <td><img src='${response.data[i].profile_pic}' height='100' width='100' ></td>
            </tr>`;
            }
      tbody.html(tr);
      loading.text("")

  }

}
$(document).ready(function(){

  
    $('#students-table').hide();
    // jQuery methods go here
    $( "#registration" ).submit(function( event ) {
      event.preventDefault();
      saveImage();

    });
    $( "#male, #female" ).click(function( event ) {
      event.preventDefault();
      gender = $(this).val()
      console.log();
      getStudentsByGender(gender);
    })
    $( "#get-students" ).click(function( event ) {
      event.preventDefault();
        getStudents();
    })
  });