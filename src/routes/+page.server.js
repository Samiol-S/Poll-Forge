import { redirect } from '@sveltejs/kit'

export function load({ cookies }) {
  const isLoggedIn = cookies.get('loggedIn');
  if (isLoggedIn) {
    redirect(307,'/main/ongoing');
  }
  else{
    redirect(307,'/authentication/login');
  }
}