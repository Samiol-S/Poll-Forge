import { json } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";
import { redirect } from "@sveltejs/kit";
import bcrypt, { hash } from "bcryptjs";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { SECRET_JWT_SECRET } from '$env/static/private'

export const POST = async ({ request, cookies }) => {
  const { email, password } = await request.json();

  let user;

  const { data:myDataFromDB, error:error1 } = await supabase
  .from('users')
  .select('*')
  .eq('email', email)

  if (error1) {
    return json({ status:false });
  }

  user = myDataFromDB[0];

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return json({status:false})
  }

  const token = await jwt.sign({
    userID: user.userID,
    username: user.username,
    email
  }, SECRET_JWT_SECRET)

  await cookies.set('token', token, {
      httpOnly: false,
      secure: false,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 * 30
  })
  await cookies.set('loggedIn', true , {
      httpOnly: false,
      secure: false,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 * 30
  })


  return json({status:true});

}