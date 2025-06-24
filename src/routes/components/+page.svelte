<script>
  import Card from "./Card.svelte";

  let options = [{
    optionName : "Svelte",
    optionVotes: 73,
  },{
    optionName : "React",
    optionVotes: 37,
  },{
    optionName : "Vue",
    optionVotes: 68,
  },];

  let stats = {
    totalVotes: 190,
    timeAgo: 2
  };
</script>

<h2 class="page-title text-center ">On Going</h2>
<Card options={options} stats={stats}/>
<Card options={options} stats={stats}/>
<Card options={options} stats={stats}/>



<style>
  .page-title{
    font-weight: 900;
    font-size:3rem;
  }
</style>