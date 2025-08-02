import { json } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { SECRET_JWT_SECRET } from '$env/static/private'

export const GET = async ({ params, cookies }) => {
  const token = cookies.get('token');
  const verifiedToken = await jwt.verify(token, SECRET_JWT_SECRET);
  if(!verifiedToken) {
    return json({ status: false, message: "Invalid token" }) 
  }
  const { payload } = verifiedToken;

  const currentUserID = payload.userID;






  let pollID = params.slug;

  let poll;
  const { data:myPollFromDB, error:error1 } = await supabase
  .from('polls')
  .select('*')
  .eq('pollID', pollID)

  if (error1) {
    console.log('Something went wrong with polls.');
  }

  poll = myPollFromDB;


  let options
  const { data:myOptionsFromDB, error:error2 } = await supabase
  .from('options')
  .select('*')
  .eq('pollID', pollID)

  if (error2) {
    console.log('Something went wrong with options.');
  }

  options = myOptionsFromDB

  let comments;
  let { data:myCommentsFromDB, error:error3 } = await supabase
  .from('comments')
  .select('*')
  .eq('pollID', pollID)

  if(error3) {
    console.log('Something went wrong with comments.');
  }

  comments = myCommentsFromDB;
  
  let allChoices;
  const { data:myChoicesFromDB, error:error4 } = await supabase
  .from('choices')
  .select('*')
  

  if (error4) {
    console.log('Something went wrong with Choices.');
  }

  allChoices = myChoicesFromDB;

  let userChoices;

  const { data:myChoiceFromDB, error:error5 } = await supabase
  .from('choices')
  .select('*')
  .eq('userID', currentUserID);

  if (error5) {
    console.log('Something went wrong with user choice.')
  }

  userChoices = myChoiceFromDB;

  let avatars;

  const { data:myAvatarFromDB, error:error6 } = await supabase
  .from('users')
  .select('avatar,userID')

  if (error6) {
    console.log('Something went wrong with getting avatars.')
  }

  avatars = myAvatarFromDB;


  return json({ poll, options, comments, currentUserID, allChoices, userChoices, avatars })

}

export const POST = async ({ request, params, cookies }) => {
  const token = cookies.get('token');
  const verifiedToken = await jwt.verify(token, SECRET_JWT_SECRET);
  if(!verifiedToken) {
    return json({ status: false, message: "Invalid token" }) 
  }
  const { payload } = verifiedToken;

  const currentUserID = payload.userID;
  const username = payload.username

  let pollID = params.slug;



  const { text } = await request.json();

  const { status, error } = await supabase
  .from('comments')
  .insert({ text, pollID, username, userID:currentUserID })

  if (error) {
    console.log('Something went wrong inserting the comment.');
  }

  return json({ status });
}