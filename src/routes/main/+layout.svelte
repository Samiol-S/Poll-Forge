<script>
  import { on } from 'svelte/events';
  import { fly } from 'svelte/transition'
  import Option from '$lib/components/Option.svelte';
  import getPollsFromServer from './ongoing/+page.svelte'
  import { json } from '@sveltejs/kit';
  import { goto } from '$app/navigation';
  import { ProgressBar } from "@prgm/sveltekit-progress-bar";

  let {children} = $props();
  
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




  function logout() {
    const logoutRequest = fetch('/api/logout');

    logoutRequest.then((res) => {
      return res.json();
    }).then((json) => {
      if (json.status) {
        goto('/authentication/login');
      }

    })
  }
</script>

<header class="d-flex header pt-3 align-items-center">
  <h1 class="main-title ps-3">Poll Forge</h1>
  <nav class="navigation">
    <button class="nav-anchor me-4" >About Us</button>
    <button class="nav-anchor me-4" >Contact Us</button>
    <button class="nav-anchor me-4" >Finished Polls</button>
    <button class="nav-anchor me-4" onclick={() => {goto('/main/ongoing')}}>On Going</button>



    <div class="d-inline-block dropdown">
      <span class="account-dropdown me-4" data-bs-toggle="dropdown">Account</span>
      <div class="dropdown-menu text-center">
        <button class="dropdown-item" onclick={() => {
          goto('/main/avatars')
        }}>My Avatar</button>
        <button class="dropdown-item" onclick={logout}>Log Out</button>
      </div>
    </div>
    
    
    
    
    <button class="menu-button pe-4 pe-sm-5" onclick={() => {openned = !openned}}>Menu</button>
  </nav>
</header>
<div class="progress-bar">
  <ProgressBar color="#345995" zIndex={10000} />
</div>



{#if openned}
    <nav transition:fly={{y:-100}} class="side-bar d-flex flex-column">
      <button onclick={() => {goto('/main/ongoing')}} class="side-anchor p-3" >On Going</button>
      <button class="side-anchor p-3" >Finished Polls</button>
      <button class="side-anchor p-3" >About Us</button>
      <button class="side-anchor p-3" >Contact Us</button>    
    </nav>  
{/if}


<main>
  <!-- <div class="filters">
  <p class="filters-title mb-1">Fliters :</p>
  <label class="box-checkbox ps-3 ">
    <input type="checkbox">
    <span class="checkmark"></span>
    Last 24-Hours
  </label>
</div> -->

  
  {@render children()}
</main>

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
  .invalid {
    color:#E40066;
    font-weight: bolder;
  }
  .valid {
    color:rgb(50, 153, 26);
    font-weight: bolder;
  }
  .side-anchor{
    border:none;
    background-color: transparent;
    text-decoration: none;
    color:#345995;
    font-weight: 900;
    font-size: 1.20rem;
    cursor: pointer;
    text-align: center;

  }
  .side-bar{
    position:fixed;
    top:3.5rem;
    right:0;

    background-color: #F7F7F2 ;
    min-height:30vh;
    z-index:99;
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

  .filters-title{
    color:#6B6B6B;
    font-weight: bold;
  }
  .filters{
    position: fixed;
    left:5rem;
    top:10rem;
  }
  .dropdown-menu{
    background-color: #D9D9D9;
  }
  .dropdown-item{
    
    color:#345995;
    font-weight: bold;
    font-size:1.2rem;
    padding:0.8rem;
  }
  .dropdown-item:hover{
    background-color: transparent;
    color: #1c3050;
  }
  main {
    padding-top:8rem;
    padding-bottom:10rem;
    position:relative;
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
  
  .header{
    background-color: #F7F7F2;

    justify-content: space-between;
    position:fixed;
    top:0;
    left:0;
    right:0;
    z-index:100;
  }
  .nav-anchor{
    transition:color 0.2s;
    border:none;
    background-color: #F7F7F2;
    text-decoration: none;
    color:#345995;
    font-weight: 900;
    font-size: 1.20rem;
    cursor: pointer;
  }
  .nav-anchor:hover{
    transition:color 0.2s;
    color: #E40066;
  }
  .account-dropdown{
    transition:color 0.2s;
    color:#345995;
    font-weight: 900;
    font-size: 1.20rem;
    cursor:pointer;
  }
  .account-dropdown:hover{
    transition:color 0.2s;
    color: #E40066;
  }
  .main-title{
    color:#345995;
    font-weight: 900;
  }
  .menu-button{
    border:none;
    background-color: transparent;
     color:#345995;
    font-weight: 900;
    font-size: 1.20rem;
    cursor:default;
  }

  @media(max-width:830px){
    .nav-anchor{
      display:none;
    }
  }
  @media(min-width:830px){
    .menu-button{
      display:none;
    }
    .side-bar{
      display: none;
    }
  }
  @media(max-width:1200px){
    .filters{
      display:none;
    }
  }

   @media(max-width:576px){
   }












  /* this is the css for the checkboxes :*/
  .box-checkbox {
    display: block;
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    font-size: 16px;
    user-select: none;
    color:#6B6B6B;
  }

  .box-checkbox input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 15px;
    width: 15px;
    background-color: #F7F7F2;
    border: 2px solid #ccc;
    border-radius: 4px;
  }

  .box-checkbox:hover input ~ .checkmark {
    border-color: #888;
  }

  .box-checkbox input:checked ~ .checkmark {
    background-color: #6B6B6B;
    border-color: #6B6B6B;
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .box-checkbox input:checked ~ .checkmark:after {
    display: block;
  }

  .box-checkbox .checkmark:after {
    left:13.5px;
    bottom:8.5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  .box-checkbox {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding-left: 0 !important;
  }

  .box-checkbox .checkmark {
    position: static; 
    margin-right: 0; 
    flex-shrink: 0; 
  }

  .box-checkbox input[type="checkbox"] {
    position: static; 
    margin: 0; 
  }






</style>