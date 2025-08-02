<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

  let token;
  let nameWrong = $state(false);
  let emailWrong = $state(false);
  let passWrong = $state(false);
  let loading = $state(false);
  let exists = $state(false);
  let successful = $state(false);

  let name = $state('');
  let password = $state('');
  let email = $state('');

  let emailInput = $state();
  let passwordInput = $state();

  function signUp() {
  // SignUp validation : 
    if (password.length >= 8 && passwordInput.checkValidity()) {
        if (emailInput.checkValidity()) {
          if (name.trim().length >= 5) {
            loading = true;
            const signUpRequest = fetch('/api/signup', {
              method: "POST",
              body: JSON.stringify({
                password,
                email,
                name
              }),
              headers:{"Content-Type" : "application/json"}
            })

            signUpRequest.then((response) => {
              return response.json();

            }).then((json) => {
              console.log(json.status)
              if (json.error2 === 'Account already exists.') {
                exists = true;
                setTimeout(() => {
                  exists = false;
                }, 2500)
              }
              else if (json.status === true){
                successful = true;
                setTimeout(() => {
                  successful = false;
                }, 5000)
              }


              password='';
              email='';
              name='';
              loading = false;
            }) 
          } else {
          nameWrong = true;

          setTimeout(() => {
            nameWrong = false;
          }, 2500)
        }
        
      } else {
        emailWrong = true;

        setTimeout(() => {
          emailWrong = false;
        }, 2500)
      }
    } else {
      passWrong = true;

      setTimeout(() => {
        passWrong = false;
      }, 2500)
      

    }
    
    }

</script>


<div class="signup-card d-flex flex-column align-items-center py-5">
  <h2 class="signup-title fs-1 pb-4">Sign Up</h2>

  <input  bind:value={name} 
  class="signup-input mb-4 w-75 p-3 pe-5 ps-4" 
  placeholder="Enter your username" type="text" required minlength="5" maxlength="20">

  <input bind:this={emailInput} bind:value={email} 
  class="signup-input mb-4 w-75 p-3 pe-5 ps-4" 
  placeholder="Enter your Email" type="email" required maxlength="40">

  <input bind:this={passwordInput} bind:value={password} 
  class="signup-input mb-5 w-75 p-3 pe-5 ps-4" 
  placeholder="Enter your Password" type="password" minlength="8" maxlength="32" >

  <button class="signup-button py-2 px-3 mb-4 d-flex" onclick={signUp}>Sign Up {#if loading}
      <div class="loader-container ps-2">
        <div class="loader"></div>
      </div>
    {/if}
  </button>


  {#if passWrong}
    <p class="invalid-paragraph">Password must be at least 8 letters.</p>
  {/if}
  {#if nameWrong}
    <p class="invalid-paragraph">Username must be at least 5 letters.</p>
  {/if}
  {#if emailWrong}
    <p class="invalid-paragraph">Please enter a valid email.</p>
  {/if}
  {#if exists}
    <p class="invalid-paragraph">This email is already in use.</p>
  {/if}
  {#if successful}
    <p class="valid-paragraph">Account created successfully.</p>
  {/if}
  
  



  <p class="signin-paragraph">Already have an account? <button class="signin-anchor p-0" onclick={() => {
    goto('/authentication/login');
  }}>Sign In!</button></p>
</div>
 
<style>
  .signup-card{
    background-color: #EDEDED;
    width:100%;
    border-radius: 25px;
  }
  .signup-title{
    font-family: "K2D", sans-serif;
    font-weight: bolder;
    
  }
  .signup-input{
    border:none;
    color:#6B6B6B;
    border-radius: 8px;
  }
  .signup-input:hover::placeholder{
    transition:color 0.3s;
    color:#383838;
  }
  .signup-input::placeholder{
    transition:color 0.3s;
  }
  .signup-button{ 
    transition:opacity 0.2s;
    border: none;
    background-color: #345995;
    color: #F7F7F2;
    border-radius: 4px;
  }
  .signup-button:hover{
    transition:opacity 0.2s;
    opacity:0.9;
  }
  .signup-button:active{
    transition: opacity 0.05s;
    opacity: 0.6;
  }
  .signin-paragraph{
    font-weight: bolder;
  }
  .signin-anchor{
    transition: color 0.2s;
    text-decoration: none;
    color:#345995;
    font-weight: bolder;
    border:none;
  }
  .signin-anchor:hover{
    transition: color 0.2s;
    color:#84abea;
  }
  .invalid-paragraph{
    color:#E40066;
    font-weight: bolder;
  }
  .valid-paragraph{
    color:rgb(50, 153, 26);
    font-weight: bolder;
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


  @keyframes spin {

    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }

  }
</style>