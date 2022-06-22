const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6aXZscXN0eW54aGJmYWJ4aHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ0MDE5NzAsImV4cCI6MTk2OTk3Nzk3MH0.wntGDWfy7wcuhepHw2XwbInty25vUG_6AI4U4GsJTKg'

const options = {
  schema: 'public',
  headers: { 'x-my-custom-header': 'bsit' },
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true
}
const conn = supabase.createClient("https://zzivlqstynxhbfabxhpi.supabase.co", SUPABASE_KEY, options)
const save = async (e) => {
console.log("Connecting")
const { response, error } = await conn.from("students")
.insert({
  email : "test@gmail.com",
  first_name: "jb",
  last_name: "castillo",
})

if (error) console.error(error)
if (response) console.error(response)
}
save();