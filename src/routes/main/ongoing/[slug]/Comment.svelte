<script>
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import { fly } from 'svelte/transition';


  let { comment, avatar } = $props();

  dayjs.extend(relativeTime);
  const createdAt = comment.created_at;
  const formatedTime = dayjs(createdAt).fromNow();




  const commentText = comment.text;
  const username = comment.username
   
  
</script>

<div transition:fly={{x:-50, duration:550}} class="comment d-flex p-3">
  <div class="profile-pic-container d-flex justify-content-center align-items-top me-2 pt-1">
    <img class="profile-picture  " src="/images/avatars/{avatar}.png" alt="profile pic">
  </div>
  
  <div class="inner-comment px-3 pt-2 px-sm-4 pt-sm-3 pb-4">
    <div class="name">
      <span >{username}</span>
    </div>
    <div class="text">
      <p>{commentText}</p>
    </div>
    <span class="time">{formatedTime}</span>
  </div>
</div>

<style>
  .name{
    font-size:1.05rem;
    color:#345995;
    font-weight: bolder;
  }
  .comment{
    max-width:50rem;
    flex-grow: 1;
    
  }
  .inner-comment{
    position: relative;
    background-color: #EDEDED;
    border-radius: 40px;
    font-weight: bolder;
    padding-bottom: 5rem;
    min-width:15rem;
  }
  .time{
    color:#6B6B6B;
    font-size:0.83rem;
    position:absolute;
    bottom:0.8rem;
    right:1.4rem;
  }
  .profile-picture{
    width:2.75rem;
    height:2.75rem;
    border-radius: 100px;

  }
  .text{
    overflow-wrap: break-word;
  }
  

  @media(max-width:768px){
    .comment{
      max-width: 30rem;
    }
  }

  @media(max-width:576px) {
    .inner-comment{
      border-radius : 30px;

    }
    .comment{
      max-width:23rem;
    }
    .time{
      right: 1rem;
    }
  }
</style>

