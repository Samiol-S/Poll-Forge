import { json } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

export const GET = async ({ cookies }) => {

  await cookies.delete('token', {
    path:'/',
    httpOnly: false,
    secure: false,
  });
  await cookies.delete('loggedIn', {
    path:'/',
    httpOnly: false,
    secure: false,
  });

  return json({status:true});
  
}