<script>
  let {children} = $props();
</script>

<header class="d-flex header pt-3 align-items-center">
  <h1 class="main-title ps-3">Poll Forge</h1>
  <nav class="navigation">
    <a class="nav-anchor me-4" href="">About Us</a>
    <a class="nav-anchor me-4" href="">Contact Us</a>
    <a class="nav-anchor me-4" href="">Finished Polls</a>
    <a class="nav-anchor me-4" href="">On Going</a>

    <div class="d-inline-block dropdown">
      <span class="account-dropdown me-4" data-bs-toggle="dropdown">Account &#x1f847;</span>
      <div class="dropdown-menu text-center">
        <a class="dropdown-item" href="">My Polls</a>
        <a class="dropdown-item" href="">My Avatar</a>
        <a class="dropdown-item" href="">Log Out</a>
      </div>
    </div>
    
    
    
    
    <button class="menu-button pe-4 pe-sm-5">Menu </button>
  </nav>
</header>



<main>
  <div class="filters">
  <p class="filters-title mb-1">Fliters :</p>
  <label class="box-checkbox ps-3 ">
    <input type="checkbox">
    <span class="checkmark"></span>
    Last 24-Hours
  </label>
</div>


  {@render children()}
</main>



<style>
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
  main {
    padding-top:8rem;
    position:relative;
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
    text-decoration: none;
    color:#345995;
    font-weight: 900;
    font-size: 1.20rem;
    cursor: pointer;
  }
  .account-dropdown{
    color:#345995;
    font-weight: 900;
    font-size: 1.20rem;
    cursor:pointer;
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

  @media(max-width:800px){
    .nav-anchor{
      display:none;
    }
  }
  @media(min-width:800px){
    .menu-button{
      display:none;
    }
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