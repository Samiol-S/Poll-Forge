import { json } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { SECRET_JWT_SECRET } from '$env/static/private'

export const GET = async ({cookies}) => {
  const token = cookies.get('token');
  const verifiedToken = await jwt.verify(token, SECRET_JWT_SECRET);
  if(!verifiedToken) {
    return json({ status: false, message: "Invalid token" }) 
  }


  const { payload } = verifiedToken;
  const userID = payload.userID
  
  let options = [];
  
  let {data: myOptionsFromDB, error} = await supabase
  .from('options')
  .select('*')

  if (error) {
    console.log('Sorry, something went wrong.');
  }
  
  options = myOptionsFromDB;

  let userChoices;

  const { data:myChoicesFromDB, error:error2 } = await supabase
  .from('choices')
  .select('*')
  .eq('userID', userID);

  userChoices = myChoicesFromDB;

  

  if (userChoices.length === 0) {
    console.log('empty');
    const toInsert = options.map(option => ({
      userID,
      optionID: option.optionID,
      pollID: option.pollID
    }))

    const { data:myUserChoicesFromDB , error:error3 } = await supabase
    .from('choices')
    .insert(toInsert)
    .select('*')
    .eq('userID', userID)


    userChoices = myUserChoicesFromDB;


  }




  
  return json({ options, userChoices });


}

export const POST = async ({ request,cookies }) => {
  const token = cookies.get('token');
  const verifiedToken = await jwt.verify(token, SECRET_JWT_SECRET);
  if(!verifiedToken) {
    return json({ status: false, message: "Invalid token" }) 
  }



  let optionIDRaw;
  let users;

  

  const { pollID, name } = await request.json();

  if ( name.trim() === '' ) {
    console.log('trimmed');
    const { status:status1 , error:errorDelete } = await supabase
    .from('polls')
    .delete()
    .eq('pollID', pollID)

    return json({ status1 });
  }

  const { data:myDataFromDB, error } = await supabase
  .from('options')
  .insert({ name, pollID })
  .select('optionID')

  if (error) {
    console.log('Sorry, Something went wrong.');
  }

  optionIDRaw = myDataFromDB;
  let { optionID } = optionIDRaw[0]

  const { data:myUsersFromDB, error2 } = await supabase
  .from('users')
  .select('*')

  users = myUsersFromDB;


  if (error2) {
    console.log('Sorry, Something went wrong with getting Users.');
  }


  const toInsert = users.map( user => ({
    optionID,
    userID: user.userID,
    pollID
  }))
  

  const { status, error3 } = await supabase
  .from('choices')
  .insert(toInsert)
    


  return json({ status:true });

  
}


export const PATCH = async ({ request, cookies }) => {
  const token = cookies.get('token');
  const verifiedToken = await jwt.verify(token, SECRET_JWT_SECRET);
  if(!verifiedToken) {
    return json({ status: false, message: "Invalid token" }) 
  }
  const { payload } = verifiedToken;

  const userID = payload.userID

  let response;
  
  const { id, newChosen } = await request.json();
  

  const {data:myDataFromDB, error} = await supabase
  .from('choices')
  .update({chosen:newChosen}) 
  .eq('optionID',id)
  .eq('userID', userID)

  if (error) {
    console.log('Something went wrong.');
  }

  response = myDataFromDB;

  return json({ response });
}