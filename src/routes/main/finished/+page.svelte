<script>
  import { onMount } from "svelte";
  import Card from "$lib/components/Card.svelte";
 
  let polls = $state([]);
  let options = $state([]);
  let userChoices = [];
  let allChoices = [];
  let loaded = $state(false);
  let currentUserID = $state();
  
  function getFinishedPollsFromServer() {
    
    const pollsGetReqest = fetch('/api/polls');

    pollsGetReqest.then((response) => {
      return response.json();
    
    }).then((json) => {
      polls = json.polls.filter(poll => poll.finished === true);
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
        
      }).then(() => {
        loaded = true;
      })
    })
  }
  
  onMount(() => {
    getFinishedPollsFromServer();
    // setInterval(() => {
    //   getPollsFromServer();
    // }, 10000)
  })
  
</script>



<h2 class="page-title text-center ">Finished</h2>

{#if loaded}
  {#each polls as poll}
    <Card pollQuestion = { poll.question } pollTime = { poll.created_at } totalVotes = { poll.votes } pollID = { poll.pollID } options = {options} userChoices = {userChoices } userID = { poll.userID } currentUserID = { currentUserID } allChoices = { allChoices } username = {poll.username} isDisabled =d-none  />
  {/each}
{/if}


<button class="reload-button p-2" aria-label="refresh-button" onclick={getFinishedPollsFromServer}>
  <img class="reload-image" src="/images/reload.png" alt="refresh">
</button>



<style>
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
    box-shadow: 1px 12px 5px rgb(116, 116, 116);
    transform:translateY(-0.4rem);
  
  }

  
</style>