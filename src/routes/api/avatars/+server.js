import { json } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";
import { redirect } from "@sveltejs/kit";
import bcrypt, { hash } from "bcryptjs";
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
  const username = payload.username;

  let avatar; 

  const { data:myDataFromDB, error } = await supabase
  .from('users')
  .select('avatar')
  .eq('userID', currentUserID)
  .single()

  if (error) {
    console.log('Something went wrong with getting avatar.')
  }

  avatar = myDataFromDB;


  return json({ avatar, username });
}

export const PATCH = async ({ request, cookies }) => {
  const token = cookies.get('token');
  const verifiedToken = await jwt.verify(token, SECRET_JWT_SECRET);
  if(!verifiedToken) {
    return json({ status: false, message: "Invalid token" }) 
  }

  const { payload } = verifiedToken;
  const currentUserID = payload.userID;
  
  const { newAvatar } = await request.json();

  const { status, error } = await supabase
  .from('users')
  .update({ avatar:newAvatar })
  .eq('userID', currentUserID)

  if (error) { 
    console.log('Something went wrong updating the avatar');
  }

  return json({ status, newAvatar });

}