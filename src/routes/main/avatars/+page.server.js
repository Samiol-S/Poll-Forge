export async function load({ fetch }) {

  const response = await fetch('/api/avatars');

  const json = await response.json();

  return ({
    json
  })
}