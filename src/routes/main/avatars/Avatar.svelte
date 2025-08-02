<script>
  let { selected=false , avatarName } = $props()
</script>

{#if selected}
  <div class=" avatar-container d-flex flex-column align-items-center">
    <div class="profile-pic-container mb-5">
      <img class="profile-picture" src="/images/avatars/{avatarName}.png" alt="avatar">
    </div>
    <div>
      <p class="avatar-name text-center" >{avatarName}</p>
    </div>
  </div>

  {:else}

  <div class="unselected-avatar-container d-flex align-items-center px-4 py-3 mb-3">
    <div class="pe-3 me-4">
      <img class="unselected-image" src="/images/avatars/{avatarName}.png" alt="avatar">
    </div>
    <div>
      <p class="unselected-avatar-name mb-0">{avatarName}</p>
    </div>
  </div>
{/if}



<style>
  .unselected-avatar-container:hover{
    border:solid;
    border-color: #345995;
    .unselected-image{
      border:solid;
      border-color: #345995;
    } 
    
    
  }
  .unselected-avatar-container{
    background-color: #EDEDED;
    border-radius: 30px; 
    cursor: pointer;
    
  }
  .unselected-avatar-name{
    font-size: 1.3rem;
    font-weight: bolder;
  }

  
    
  .unselected-image{
    
    border-radius: 100px;
    height:5rem;
    width:5rem;
  }
  .avatar-container{
    max-width: 20rem;
  }
  .profile-picture{
    width:17rem;
    height:17rem;
    border-radius:1000px;
    border:solid;
    border-color: #345995;
    border-width:0.5rem;
    
  }
  .avatar-name{
    font-size:2rem;
    font-weight: bolder;
  }
  
</style>