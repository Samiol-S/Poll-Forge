<script>
  import Comment from "./Comment.svelte";
  import Card from "$lib/components/Card.svelte";
  import { onMount } from "svelte";
  import { fly, fade } from 'svelte/transition';
  import Input from "./Input.svelte";
  
  let refreshed = $state(true);

  let { data } = $props();
  
  let pollID = data.pollID;

  
  let poll = $state(data.json.poll[0]);
  let options = $state(data.json.options);
  let comments = $state(data.json.comments);

  let currentUserID = $state(data.json.currentUserID);
  let allChoices = $state(data.json.allChoices);
  let userChoices = $state(data.json.userChoices);
  let avatars = $state(data.json.avatars);


  

  function getComments () {
    refreshed = false;
    const getRequest = fetch(`/main/ongoing/${pollID}/comments`);

    getRequest.then((res) => {
      console.log('first')
      return res.json();

    }).then((json) => {
      poll = json.poll[0];
      options = json.options;
      comments = json.comments;
      allChoices = json.allChoices;
      currentUserID = json.currentUserID;
      userChoices = json.userChoices;
      avatars = json.avatars;
    }).then(() => {
      refreshed = false;
    }).then(() => {
      refreshed = true;
    })
  }


</script>



<main class="d-flex flex-column justify-content-center align-items-center">
  
  <div class="pollCard">
    <Card pollQuestion = { poll.question } pollTime = { poll.created_at } pollID = { poll.pollID } options = {options} userChoices = {userChoices } userID = { poll.userID } currentUserID = { currentUserID } allChoices = { allChoices } username = {poll.username} margin='0' />

  </div>

  <h2 transition:fade class="comments-title">Poll Comments :</h2>

  <Input pollID={pollID} />

  <div transition:fly={{x:-50, duration:550}} class="comments d-flex flex-column justify-content-top align-items-start">
    {#each comments as comment}
      {#each avatars as avatar}
        {#if comment.userID === avatar.userID}
          <Comment comment={comment} avatar={avatar.avatar}/>
        {/if }
        
      {/each}
      
    {/each}
  </div>
  
</main>



{#if !refreshed}
  <button class="reload-button p-2" aria-label="refresh-button" onclick={getComments}>
    <img class="reload-image spin" src="/images/reload.png" alt="refresh">
  </button>
  {:else}
    <button class="reload-button p-2" aria-label="refresh-button" onclick={getComments}>
      <img class="reload-image" src="/images/reload.png" alt="refresh">
    </button>
{/if}



<style>
  main{
    padding-top:0;
  }
  .comments-title{
    padding-top: 2rem;
    font-weight: bolder;
  }
  .comments{
    min-width: 50rem;
  }
  @media(max-width:800px){
    .comments{
      min-width: 37rem;
    }
  }
  @media(max-width:576px){
    .comments{
      min-width: 22rem;
    }
    
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

    @keyframes spin {

      0%{
        transform: rotate(0deg);
      }
      100%{
        transform: rotate(360deg);
      }

    }
</style>

