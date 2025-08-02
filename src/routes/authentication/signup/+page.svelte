<script>
  import Card from "./Card.svelte";
</script>

  <main class="background container-fluid d-flex justify-content-center align-items-center  vh-100">
    <div class="signup-card vh-75" >
      <Card/>
    </div>
  </main>


<style>
  .background{
    background-image: url("/images/login.png");
    background-size:cover;
    background-position: right;
    background-repeat: no-repeat;
  }
  .signup-card{
    width: 40%;
  }
  @media(max-width:992px){
    .signup-card{
      width:60%;
    }
  }
  @media(max-width:576px){
    .signup-card{
      width:100%;
    }
  }
</style>