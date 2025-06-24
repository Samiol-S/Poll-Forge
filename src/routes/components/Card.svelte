<script>
  let {options, stats} = $props();
  import Option from "./Option.svelte";
</script>

<div class="container card px-sm-3">
  <p class="title ps-3 pt-3 mb-3">Which one is the best FrameWork ?  :</p>
  <div class="options mb-md-3">
    {#each options as option}
      <Option optionName={option.optionName} optionVotes={option.optionVotes} totalVotes={stats.totalVotes}/>
    {/each}
    
  </div>

  <div class="d-flex justify-content-end pe-sm-3 pb-3 align-items-center" >
    <span class="texty">{stats.timeAgo} hours ago</span>
    <span class="texty ms-2">{stats.totalVotes} votes</span>
    <button class="comment-button ms-3 ms-sm-4">Comments</button>
  </div>


</div>



<style>
  .card{
    background-color: #EDEDED;
    border:none;



    margin-top:3rem;
    width:40rem;
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
  .comment-button{
    border:none;

    background-color: transparent;
    color:#345995;
    font-weight: bolder;
    font-size: 1.2rem;
  }







  @media(max-width:576px){
    .card{
      width:25rem;      
    }

    .title{
      font-size:1.28rem
    }
    
  }
</style>