const PROJECT_URL = "https://tsbysxjalagqqcvrhhzt.supabase.co"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzYnlzeGphbGFncXFjdnJoaHp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTU4NTkxMDcsImV4cCI6MTk3MTQzNTEwN30.C0qfsr7QymZH8eziIO3nfq9pCM8LTGACCf2AUCWQVbI"


// Create a single supabase client for interacting with your database 
const connection = supabase.createClient(PROJECT_URL,API_KEY)

async function saveImage(){
  
  let fname = $('#first-name').val();
  let lname = $('#last-name').val();
  let email = $('#email').val();
  let pic = $('#profile-pic').prop('files');
  let fileName = fname.replace(" ","").toLowerCase() +"_" +lname.replace(" ","").toLowerCase();

  const { data, error } = await connection.storage.from('products')
  .upload(`public/${fileName}.jpg`, pic[0], {
    upsert: true
  })
 
  if(data) {      
    //picPath = `${PROJECT}/storage/v1/object/public/${data["Key"]}`
    picPath = 'https://zzivlqstynxhbfabxhpi.supabase.co/storage/v1/object/'+data["Key"]
    register(fname,lname,email,picPath)

  }
  if(error) {
    console.log(error)
  }

}
async function saveStudent(fname, lname, username){

  const { data, error } = await connection.from("students").insert({
    first_name: fname,
    last_name: lname,
    user_name: username,
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

async function getStudent() {
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
      let fname = $('#first-name').val();
      let lname = $('#last-name').val();
      let username = $('#username').val();
      saveStudent(fname,lname,username);

    });
  });