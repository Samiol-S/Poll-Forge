<script>
    import { goto } from "$app/navigation";

  let token;

  let password = $state('');
  let email = $state('');
  let loading = $state(false);
  let wrong = $state(false);
  let wrongInfo = $state(false);
  
  function signIn() {
    
    if ( email!== '' && password !== ''){
      loading = true;
   
      const logInRequest = fetch('/api/login', {

        method: "POST",
        body: JSON.stringify({
          password,
          email
        }),
        headers:{"Content-Type" : "application/json"}

      })

      logInRequest.then((response) => {

        return response.json();

      }).then((json) => {

        if (json.status) {
          password='';
          email='';
          
          goto('/main/ongoing');

        } else {

          loading = false;
          wrongInfo = true;
          setTimeout(() => {
            wrongInfo = false;
          }, 2500)
        }
        
        
      }) 
    }
    else {

      wrong = true;

      setTimeout(() => {
        wrong = false;
      }, 2500)
      
    }

  }


</script>






<div class="signin-card d-flex flex-column align-items-center py-5">
  <h2 class="signin-title fs-1 pb-4">Sign In</h2>

  <input bind:value={email} 
  class="signin-input mb-4 w-75 p-3 pe-5 ps-4" 
  placeholder="Enter your Email" type="email">

  <input bind:value={password} 
  class="signin-input mb-5 w-75 p-3 pe-5 ps-4" 
  placeholder="Enter your Password" type="password">

  <button class="signin-button py-2 px-3 mb-4 d-flex " onclick={signIn}>Sign In
    {#if loading}
      <div class="loader-container ps-2">
        <div class="loader"></div>
      </div>
    {/if}
    
  </button>
  {#if wrong}
    <p class=invalid-paragraph>Email / Password mustn't be empty.</p>
  {/if}
  {#if wrongInfo}
    <p class=invalid-paragraph>Email / Password is incorrect.</p>
  {/if}
  <p class="signup-paragraph">Don't have an account? <button class="signup-anchor p-0" onclick={() => {
    goto('/authentication/signup');
  }}>Sign up!</button></p>
</div>




 
<style>
  .signin-card{
    background-color: #EDEDED;
    width:100%;
    border-radius: 25px;
  }
  .signin-title{
    font-family: "K2D", sans-serif;
    font-weight: bolder;
    
  }
  
  .signin-input:hover::placeholder{
    transition:color 0.3s;
    color:#383838;
  }
  .signin-input::placeholder{
    transition:color 0.3s;
  }
  .signin-input{
    border:none;
    color:#6B6B6B;
    border-radius: 8px;
  }
  .signin-button{ 
    border: none;
    background-color: #345995;
    color: #F7F7F2;
    border-radius: 4px;
    transition:opacity 0.2s;
  }
  .signin-button:hover{
    transition:opacity 0.2s;
    opacity:0.9;
  }
  .signin-button:active{
    transition: opacity 0.05s;
    opacity: 0.6;
  }
  .signup-paragraph{
    font-weight: bolder;
  }
  .signup-anchor{
    transition: color 0.2s;
    color:#345995;
    font-weight: bolder;
    border:none;
  }
  .signup-anchor:hover{
    transition: color 0.2s;
    color:#84abea;
  }

  .loader-container{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loader{
    background-color:transparent;
    border:solid;
    border-color:#303030;
    border-top-color:#9B9B9B;
    border-radius:100px;
    border-width:2.5px;
    width:1rem;
    height:1rem;

    animation: spin 2s linear 0s infinite;
  }
  .invalid-paragraph{
    color:red;
    font-weight: bolder;
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