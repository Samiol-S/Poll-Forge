import { redirect } from '@sveltejs/kit'

export function load({ cookies }) {
  const isLoggedIn = cookies.get('loggedIn');
  if (!isLoggedIn) {
    redirect(307,'/login');
  }
   
  }