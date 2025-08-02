import { json } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { SECRET_JWT_SECRET } from '$env/static/private'

export const GET = async ({ cookies }) => {
  const token = cookies.get('token');
  const verifiedToken = await jwt.verify(token, SECRET_JWT_SECRET);
  if(!verifiedToken) {
    return json({ status: false, message: "Invalid token" }) 
  }

  const { payload } = verifiedToken;

  const currentUserID = payload.userID;

  let polls = [];
  let allChoices = [];

  const { data: myPollsFromDB, error } = await supabase
  .from('polls')
  .select('*')

  
  if (error) {
    console.log('Sorry, Something went wrong.')
  }

  const { data:myChoicesFromDB, error:error2 } = await supabase
  .from('choices')
  .select('*')

  if (error2) {
    console.log('Something went wrong with the choices.')
  }

  allChoices = myChoicesFromDB;


  polls = myPollsFromDB

  return json({ polls, currentUserID, allChoices });
}


export const POST = async ({ request, cookies }) => {
  const token = cookies.get('token');
  const verifiedToken = await jwt.verify(token, SECRET_JWT_SECRET);
  if(!verifiedToken) {
    return json({ status: false, message: "Invalid token" }) 
  }

  const { payload } = verifiedToken;

  const userID = payload.userID
  const username = payload.username;


  let pollID;
  const { question } = await request.json();

  const { data:myDataFromDB, error } = await supabase
  .from('polls')
  .insert({ question, userID, username })
  .select('pollID')


  if (error) {
    console.log('Sorry, Something went wrong.');
  }

  pollID = myDataFromDB;


  
  return json({pollID});

  
}


export const DELETE = async ({ request, cookies }) => {
  const token = cookies.get('token');
  const verifiedToken = await jwt.verify(token, SECRET_JWT_SECRET);
  if(!verifiedToken) {
    return json({ status: false, message: "Invalid token" }) 
  }

  const { pollID } = await request.json();

  const { status, error } = await supabase
  .from('polls')
  .delete()
  .eq('pollID', pollID)

  if (error) {
    console.log('Sorry, Something went wrong.');
  }

  return json({ status });
}

