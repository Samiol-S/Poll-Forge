<script>
  let {totalVotes=0, optionVotes=0, optionName} = $props();
  let percentage = $state((optionVotes / totalVotes) * 100);
  if (totalVotes === 0) {
    percentage = 0;
  }
  import Bar from "./Bar.svelte";
</script>
  <div class="mb-4">
  <p class="option-name mb-0 offset-2">{optionName} :</p>
  <div class="options-container container d-flex justify-content-center align-items-center  ">
  <label class="custom-checkbox me-3">
    <input type="checkbox">
  </label>

  <Bar percentage={percentage} />

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
</style>