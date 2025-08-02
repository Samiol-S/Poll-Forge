import { json } from "@sveltejs/kit";
export async function load({ params, fetch }) {
  let pollID = params.slug

  const response = await fetch(`/main/ongoing/${pollID}/comments`);

  const json = await response.json();

  return {
    json,
    pollID
  }
 
}