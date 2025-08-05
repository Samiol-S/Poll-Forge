<script>
  let { getComments, pollID } = $props();
  import { fade } from "svelte/transition";
  
  let text = $state('');

  function postComment() {
    const postRequest = fetch(`/main/ongoing/${pollID}/comments`, {
      method: "POST",
      body: JSON.stringify({
        text,
        pollID
      }),
      headers: {'Content-Type' : 'application/json'}
    })
    postRequest.then((res) => {
      console.log('first')
      return res.json();

    }).then((json) => {
      
      text = '';
      getComments();
    })
  }
</script>

<div transition:fade={{duration:550}} class="d-flex flex-column add-container p-3">
  <div>
    <textarea bind:value={text} placeholder="Add a Comment..."></textarea>
  </div>

  <div class="d-flex justify-content-end">
    <button class="cancel-button" onclick={() => {
      text = '';
    }}>Clear</button>

    {#if text.trim() !== ''}
      <button onclick={postComment} class="comment-button ms-2 px-2 py-1">Comment</button>
      {:else}
      <button onclick={postComment} disabled class="comment-button ms-2 px-2 py-1">Comment</button>
    {/if}
    
  </div>
 
</div>


<style>
  .add-container{
    max-width: 50rem;
    width:100%
  }.comment-button:disabled{
    opacity: 0.5;
  }
  .comment-button{
    background-color: #345995;
    color:white;
    font-weight: bold;
    font-size: 1rem;
    border:none;
    border-radius: 4px;
    box-shadow: 1px 2px 2px rgb(116, 116, 116);
  }
  .cancel-button{
    color:#345995;
    font-weight: bold;
    border:none;
    background-color: #F7F7F2;
  }



  textarea::placeholder{
    color:#6B6B6B;
  }
  textarea {
    width:100%;

    min-height:2rem;
    background-color: #F7F7F2;
    color:black;
    font-weight: bold;
    padding-left: 1.5rem;

    resize:none;
    field-sizing:content;

    border:none;
    border-bottom: solid;
    border-width: 1px;
    outline: none;
  }
</style>