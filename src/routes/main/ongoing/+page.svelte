<script>
  import { onMount } from "svelte";
  import Card from "$lib/components/Card.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import { fade } from "svelte/transition";
 
  let polls = $state([]);
  let options = $state([]);
  let userChoices = [];
  let allChoices = [];
  let loaded = $state(false);
  let refreshed = $state(false);
  let currentUserID = $state();
  
  function getPollsFromServer() {
    refreshed = false;
    
    const pollsGetReqest = fetch('/api/polls');

    pollsGetReqest.then((response) => {
      return response.json();
    
    }).then((json) => {
      polls = json.polls.filter(poll => poll.finished === false);
      currentUserID = json.currentUserID;
      allChoices = json.allChoices;

    }).then(() => {

      const optionsGetRequest = fetch('/api/options');

      optionsGetRequest.then((response) => {
        return response.json();

      }).then((json) => {
        options = json.options;
        userChoices = json.userChoices
        loaded = false;
        refreshed = false;
        
      }).then(() => {
        loaded = true;
        refreshed = true;
      })
    })
  }
  
  onMount(() => {
    getPollsFromServer();
    // setInterval(() => {
    //   getPollsFromServer();
    // }, 10000)
  })
  
</script>



<h2 class="page-title text-center ">On Going</h2>

{#if loaded}
  {#each polls as poll}
    <Card pollQuestion = { poll.question } pollTime = { poll.created_at } pollID = { poll.pollID } options = {options} userChoices = {userChoices } userID = { poll.userID } currentUserID = { currentUserID } allChoices = { allChoices } username = {poll.username}/>
  {/each}

  {#if polls.length === 0 }
    <div class="no-polls-container d-flex justify-content-center align-items-center">
      <p class="no-polls text-center">Sorry, There are no polls currently.</p>
    </div>
    
  {/if}
{/if}

<div>
  <Loader loaded={loaded} />
</div>






{#if !refreshed}
  <button class="reload-button p-2" aria-label="refresh-button" onclick={getPollsFromServer}>
    <img class="reload-image spin" src="/images/reload.png" alt="refresh">
  </button>
  {:else}
    <button class="reload-button p-2" aria-label="refresh-button" onclick={getPollsFromServer}>
      <img class="reload-image" src="/images/reload.png" alt="refresh">
    </button>
{/if}




<style>
  .no-polls-container{
    height:20rem;
  }
  .no-polls{
    font-size:3rem;
    font-weight: bolder;
    color:#6B6B6B
  }
  .page-title{
    font-weight: 900;
    font-size:3rem;
  }
  .reload-image{
    width:2rem;
    
  }
  .reload-button{
    transition: box-shadow 0.5s, transform 0.5s;
    position:fixed;
    right:16rem;
    bottom:3.2rem;  
    background-color: #F4F4F4;
    color:#6B6B6B;
    border:none;
    border-radius:105px;
    box-shadow: 1px 4px 5px rgb(116, 116, 116);

  }
  .reload-button:hover{
    transition: box-shadow 0.5s, transform 0.5s;
    box-shadow: 1px 12px 8px rgb(116, 116, 116);
    transform:translateY(-0.4rem);
  
  }

  .spin{
    animation: spin 1s linear 0s infinite;
  }

  @media(max-width:768px){
    .no-polls{
      font-size: 2rem;
    }
  }


  @keyframes spin {

    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }

  }
</style>