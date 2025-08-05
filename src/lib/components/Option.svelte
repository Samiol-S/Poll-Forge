<script>
  let { refreshPolls ,totalVotes=0 , name , id , userChoices , allChoices, color, isDisabled } = $props();

  
  const thisOptionChoices = allChoices.filter(choice => choice.optionID === id);
  const thisOptionVotes = thisOptionChoices.filter( choice => choice.chosen === true );

  console.log(isDisabled)

  const votes = thisOptionVotes.length;


  let percentage = $state((votes / totalVotes) * 100);
  if (totalVotes === 0) {
    percentage = 0;
  }
  import Bar from "./Bar.svelte";
  import { get } from "svelte/store";
  import { fade } from 'svelte/transition';

  

  function updateCheckbox() {
      const patchRequest = fetch('/api/options', {
        method:"PATCH",
        body:JSON.stringify({
          newChosen: !chosen,
          id
        }),
        headers: {"Content-Type": "application/json"}
      })

      patchRequest.then((response) => {
        return response.json();
      }).then(() => {
        refreshPolls();
      })
    }
    let optionChoice = userChoices.filter( userChoice => userChoice.optionID === id );

    let chosen = $state(optionChoice[0].chosen);


    if (!chosen) {
      color = '34599580';
    }

    
</script>

<div class="mb-4" transition:fade >
  <p class="option-name mb-0 offset-2">{name} :</p>
  <div class="options-container container d-flex justify-content-center align-items-center  ">
  <label class="custom-checkbox me-3 {isDisabled}">  
    <input class="option-checkbox" type="checkbox" bind:checked={chosen} onclick={updateCheckbox}>
  </label>

  <Bar percentage={percentage} color = {color}/>

  <span class="ms-2 percentage">{Math.round(percentage)}%</span>
  </div>
  
</div>







<style>
  .percentage{
    font-weight: bolder;
  }
  .options-container{
    padding-inline:3rem;
  }
  .option-name{
    font-weight: bold;
    font-size:1.2rem;
  }
  




  @media (max-width: 576px) {
    .options-container{
      padding-inline:1.2rem;
    }
  }




  .custom-checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: Arial, sans-serif;
    font-size: 16px;
  }

  .custom-checkbox input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    width: 1.875rem;
    height:1.875rem;
    border-radius: 50%;
    border: none;
    background-color: #D9D9D9;
    outline: none;
    cursor: pointer;
    transition: background-color 0.2s ease;
    display: inline-block;
  }

  .custom-checkbox input[type="checkbox"]:checked {
    background-color: #345995;
  }
  .custom-checkbox input[type="checkbox"]:hover {
    background-color: #34599580;
  }
  .custom-checkbox input[type="checkbox"]:active {
    background-color: #345995;
  }
</style>