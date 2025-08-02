import { json } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";
import bcrypt, { hash } from "bcryptjs";

export const POST = async ({ request }) => {
  const { email, password, name } = await request.json();

  const { data:dataFromDB, error:error1 } = await supabase
  .from('users')
  .select('*')
  .eq('email', email)
  

  if (dataFromDB.length !== 0) {
    
    return json({ error2:'Account already exists.'})
  }



  let hashedPassword;
  try{

    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);

  }catch{
    
    console.log("error during password hashing")
  
  }
  


  let response;
  const { status:requestStatusFromDB, error } = await supabase
  .from('users')
  .insert({password:hashedPassword, email, username:name})

  if(error) {
    console.log('Error with supabase request');
  }
  
  response = requestStatusFromDB;

  return json({ response, status:true });
  
}