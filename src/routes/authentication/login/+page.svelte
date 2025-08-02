<script>
  import Card from "./Card.svelte";
</script>

<main class="background">
  <div class="site-container container-fluid d-flex align-items-center justify-content-center">
    <div class="title">
      <p class="mb-0 fs-5 ">Welcome to </p>
      <h1 class="pollforge">Berry's PollForge <div class="circle d-inline"></div></h1>
      <p class="fs-5 craft ">Craft your perfect Fun-Poll in seconds!</p>
    </div>
    <!-- <div class="vertical-line"></div> -->
    <div class="card-container">
      <Card/>
    </div>
  </div>
</main>


<style>
  
  .background {
    background-image: url("/images/login.png");
    background-size:cover;
    background-position: center;
    background-repeat: no-repeat;
    width:100vw;
    height:100vh;
    display:flex;
    align-items: center;
  }
  .site-container{
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .card-container{
    max-width:25rem;
    min-width: 18rem;
    flex-grow:1;
    margin-left: 5rem;
  }
  /* .vertical-line{
    width:1px;
    height:20rem;
    border-style:solid;
    border-color: gray;
    border-radius: 100px;
    background-color: transparent;
  } */
  .title{
    max-width: 38rem;
    flex-grow: 1;
    padding-left:0rem;
    font-family: "El Messiri", sans-serif;
    font-weight: bold;
  }
  .pollforge{
    font-size:4rem;
    position:relative;
  }
  .circle{
    position:absolute;
    width:1rem;
    height:1rem;
    background-color: #345995;
    border-radius: 100px;
    z-index: 100;
    bottom:0.80rem;
  }

   @media(max-width:992px){
    .craft{
      padding-left:2rem;
    }
    
    .site-container{
      flex-direction: column;
      
    }
    .background{
      align-items: start;
      padding-top:1.5rem;
      background-size:cover;
      background-position: top;
      height:120vh;
    }
    .title{
      flex-grow: none;
      padding-left: 0;
    }
    .pollforge{
      font-size:3rem;
    }
    .card-container{
      width:100%;
      flex-grow: none;
      margin-left:0;
      margin-top: 1rem;
    }
   }
  @media(max-width:768px){
    .background{
      height:100vh;
    }
    .craft{
      padding-left:1rem;
    }
  }
  @media(max-width:380px){
    
    .pollforge{
      font-size:3rem;
    }
    .title{
      text-align: center;
    }
  }

</style>  