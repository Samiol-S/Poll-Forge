<script>
  let { data } = $props();
  import Avatar from "./Avatar.svelte";

  let loaded= $state(true);
  
  let avatar = data.json.avatar.avatar;
  const username = data.json.username;

  const avatars = [
    {avatarName: 'gigachad'},
    {avatarName: '7ankalis'},
    {avatarName: '3a3a3ot'},
    {avatarName: 'andrew'},
    {avatarName: 'borat'},
    {avatarName: 'rick'},
    {avatarName: 'skibiditoilet'},
    {avatarName: 'steve'}
  ];

  function updateAvatar(newAvatar) {
    const updateRequest = fetch('/api/avatars', {
      method: "PATCH",
      body: JSON.stringify({
        newAvatar
      }),
      headers: {'Content-Type' : 'application/json'}
    })

    updateRequest.then((res) => {
      return res.json();
    }).then((json) => {
      console.log(json.status);
      avatar = json.newAvatar;

      loaded = false;
    }).then(() => {
      loaded = true;
    })
  }
</script>

<main>

  <div class="main-container ">
    
    <div class="user mb-5 d-flex flex-column justify-content-center align-items-center">
      <h1 class="fs-1  welcome mb-5">
        Welcome {username}
      </h1>

      <div class="user-main">
        {#if loaded}
          <div>
          <Avatar selected={true} avatarName={avatar}  />
        </div>
        {/if}
        
      </div>
    </div>
    
    <div class="unselected-avatars-container px-5">
      {#each avatars as avatar}
        <div onclick={() => {
          updateAvatar(avatar.avatarName)
        }}>
          <Avatar avatarName={avatar.avatarName} />
        </div>
          
      {/each}
    </div>
  </div>
  
  


</main>



<style>
  .main-container{
    display: flex;
    justify-content: center;
  }
  main{
    padding-bottom: 0;
  }
  .welcome{
    font-weight: bolder;
  }

  .unselected-avatars-container{
    overflow: auto;
    height:30rem;
    
  }

@media (max-width:576px) {
  .main-container{
    flex-direction: column;
  }
}
</style>