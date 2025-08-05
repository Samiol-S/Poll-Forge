<script>
  let { refreshPolls, deletedPoll, pollQuestion, pollTime, options , pollID, userID, currentUserID, userChoices, allChoices, username, color = '345995', isDisabled ='', margin = '3rem' } = $props();
  import Option from "./Option.svelte";
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import { onMount } from "svelte";
  import { fade } from 'svelte/transition';
  export { pollID } 
  let loaded = $state(false);


  dayjs.extend(relativeTime);

  const createdAt = pollTime;
  const formatedTime = dayjs(createdAt).fromNow();



  function deletePoll() {
    const deleteRequest = fetch('/api/polls', {
      method:"DELETE",
      body: JSON.stringify({
        pollID
      }),
      headers: {"Content-Type": "application/json"}
    })

    deleteRequest.then((res) => {
      return res.json();
    }).then((json) => {

      console.log(json.status);
      
    }).then(() => {
      deletedPoll(pollID);
    })
  }


  const thisPollChoices = allChoices.filter(choice => choice.pollID === pollID);

  const thisPollVotes = thisPollChoices.filter( choice => choice.chosen === true );
  
  const totalVotes = thisPollVotes.length;


</script>

<div transition:fade={{duration:550}} class="container card px-sm-3" style="
  margin-top:{margin};
">
  <span class="created texty fs-5"> &#xb7; {username}</span>
  <p class="title ps-3 pt-3 mb-3">{pollQuestion} :</p>
  <div class="options mb-md-3">
    
  </div>

    {#each options as option}
      {#if option.pollID === pollID}
        <Option refreshPolls = {refreshPolls} votes={option.votes} name={option.name} totalVotes={totalVotes} chosen={option.chosen} id={option.optionID} userChoices={userChoices} allChoices ={ allChoices } color={color}  isDisabled = {isDisabled}/>
      {/if}
    {/each}


  <div class="d-flex justify-content-end pe-sm-3 pb-3 align-items-center" >
    <span class="texty">{formatedTime}</span>
    <span class="texty ms-2">{totalVotes} votes</span>
    <a class="comment-button ms-3 ms-sm-4" href="/main/ongoing/{pollID}">Comments</a>
    {#if userID === currentUserID}
      <button class="delete-button ms-3 ms-sm-4" onclick={deletePoll}>Delete </button>
    {/if}

  </div>


</div>



<style>
  .created{
    position: absolute;
    top: 1.5rem;
    left: 2rem;
  }
  .card{
    background-color: #EDEDED;
    border:none;


    padding-top:3rem;
    width:40rem;
  }
  .delete-button{
    border:none;

    background-color: transparent;
    color:#E40066;
    font-weight: bolder;
    font-size: 1.2rem;
  }
  .delete-button:hover{
    opacity:0.6;
  }
  .title{
    font-weight:bolder;
    font-size:1.6rem;
  }
  .texty{
    color:#6B6B6B;
    font-size:1rem;
    font-weight: bolder;
    
  }
  .comment-button:hover{
    opacity:0.6;
  }
  .comment-button{
    border:none;
    text-decoration: none;

    background-color: transparent;
    color:#345995;
    font-weight: bolder;
    font-size: 1.2rem;
  }
  







  @media(max-width:576px){
    .card{
      
      width:22rem;      
    }

    .title{
      font-size:1.28rem
    }
    .delete-button{
      position:absolute;
      top:1.5rem;
      right:1.8rem; 
      
    }
    .created{
      left:1.8rem;
    }
  }


  
</style>
