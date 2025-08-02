<script>
  let { loaded } = $props();
  
</script>

{#if !loaded}
<main class="d-flex justify-content-center align-items-center">
  <div class="loader-container ps-2">
    <div class="loader"></div>
  </div>
</main>
{/if}


<style>
  main{
    background-color: #F7F7F7;
    width: 100vw;
    height: 50vh;
  }


  .loader-container{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loader{
    background-color:transparent;
    border:solid;
    border-color:#345995;
    border-top-color:#dadada;
    border-radius:100px;
    border-width:0.5rem;
    width:5rem;
    height:5rem;

    animation: spin 2s linear 0s infinite;
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