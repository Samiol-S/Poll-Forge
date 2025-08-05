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
  let deleted = $state(false);


  // for modal
  let openned = $state(false);
  let wrong = $state(false);
  let successful = $state(false);

  let pollID;
  let question = $state('');
  let optionFields = $state([1,2]);
  let counter = 3;
  function newOption() {
    optionFields.push(counter);
    counter++;
  }

  function deletedPoll(pollID) {
    polls = polls.filter(poll => poll.pollID !== pollID);
  }

  function postPoll() {
    if ( question !== '' && optionFields.length !== 0 ) {
      console.log('right');
      const pollPostRequest = fetch('/api/polls',{
        method:"POST",
        body:JSON.stringify({
          question
        }),
        headers: {"Content-Type": "application/json"}

      }).then((response) => {
        return response.json();

      }).then((json) => {
        

        [{pollID}] = json.pollID;


        optionFields.forEach((optionfield,index) => {
            const inputElement = document.getElementById(index);
            let optionName = inputElement.value;
            
            fetch('/api/options',{

            method:"POST",
            body:JSON.stringify({
              name:optionName,
              pollID
            }),
            headers: {"Content-Type": "application/json"}

          }).then((response) => {
            return response.json();
            
          }).then((json) => {
            if (json.status === true) {
              successful = true;
              setTimeout(() => {
                successful = false;
              }, 3000)
            }
          })
        })

      }).then(() => {
        
        question = '';
        optionFields.length = 0;
        getPollsFromServer();
      }).then(() => {

        optionFields.push(1,2);
      })
    } 

    else {
      console.log('wrong')
      wrong = true;

      setTimeout(() => {
        wrong = false;
      }, 2500)
    }
    
    
  }

  // ....

  
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
    <Card refreshPolls={getPollsFromServer} deletedPoll={deletedPoll} pollQuestion = { poll.question } pollTime = { poll.created_at } pollID = { poll.pollID } options = {options} userChoices = {userChoices } userID = { poll.userID } currentUserID = { currentUserID } allChoices = { allChoices } username = {poll.username}/>
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




<button class="create-poll mb-3 ms-3 p-3 px-4" data-bs-toggle="modal" data-bs-target="#poll-modal">+ Create a new Poll</button>

<!-- code under here is for the modal ! -->

<div class="modal fade " id="poll-modal" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Create a Poll</h5>
        <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body overflow-auto">


        <div class="options-list">
           <div class="mb-4">
            <p class="mb-2 align-self-start  ps-2">question</p>
            <input bind:value={question} class="input p-3 px-5" type="text" placeholder="Enter the question" maxlength="100">
          </div>

          <h3 class="text-center mb-0">Options</h3>
          {#each optionFields as optionField,index}
            <div class="mb-3" >
              <p  class="mb-2 align-self-start  ps-2">Option {index + 1} <strong>&#183;</strong> <button class="delete-option-button ps-0" onclick={() => {optionFields.splice(index,1)}}>Delete</button></p>
              <input maxlength="72" id={index} class="input p-3 px-5" type="text" placeholder="option name">
            </div>
          {/each}

          {#if wrong}
            <p class="invalid text-center">Please fill in the fields.</p>
          {/if}
          {#if successful}
            <p class="valid text-center">Your poll was created successfully.</p>
          {/if}
        </div>
        <div class="d-flex justify-content-end">
          {#if optionFields.length < 8}
            <button class="add-option-button" onclick={() => {
              newOption();
            }}>Add an option</button>
          {/if}
          
        </div>
      </div>
      {#if optionFields.length < 2}
        <div class="modal-footer">
          <button disabled onclick={postPoll} class="disabled-create-button p-2 px-4">Create</button>
        </div>
        {:else}
        <div class="modal-footer">
          <button onclick={postPoll} class="create-button p-2 px-4">Create</button>
        </div>
      {/if}
      
      


    </div>
  </div>
</div>





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

  .invalid {
    color:#E40066;
    font-weight: bolder;
  }
  .valid {
    color:rgb(50, 153, 26);
    font-weight: bolder;
  }

  .delete-option-button{
    background-color: white;
    border:none;
  }
  .delete-option-button:hover{
    color:#E40066;
  }
  .create-button{
    transition: opacity 0.3s;
    color:white;
    background-color: #345995;
    border:none;
    border-radius:4px;
    font-weight: bold;
  }
  .create-button:hover{
    transition: opacity 0.3s;
    opacity: 0.7;
  }
  .create-button:active{
    transition: opacity 0.1s;
    opacity: 0.4;
  }
  .disabled-create-button{
    color:white;
    background-color: #345995;
    border:none;
    border-radius:4px;
    font-weight: bold;
    opacity:0.4;
  }
  .add-option-button{
    color:#345995;
    background-color: white;
    border:none;
  }
  .add-option-button:hover{
    opacity:0.6;
  }
  .modal{
    color:#EDEDED;
  }
  .input{
    transition:color 0.3s;
    width:100%;

    color:#6B6B6B;
    background-color: #F7F7F2;
    border:none;
    border-radius:12px;
  }
  .input:hover::placeholder{
    transition:color 0.2s;
    color: black;
  }


   .create-poll{
    transition: box-shadow 0.5s, transform 0.5s;
    position:fixed;
    right:2rem;
    bottom:2rem;  
    background-color: #F4F4F4;
    color:#6B6B6B;
    border:none;
    border-radius:105px;
    font-size:1.2rem;
    font-weight:bolder;
    box-shadow: 1px 4px 5px rgb(116, 116, 116);
  }
  .create-poll:hover{
    transition: box-shadow 0.5s, transform 0.5s;
    box-shadow: 1px 12px 5px rgb(116, 116, 116);
    transform:translateY(-0.4rem);
  
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