<script>
  let {percentage = 0} = $props();
</script>

<div class=bar-container>
  <div class=bar style="width:{percentage}%">
  </div>
</div>



<style>
  .bar-container{
    width:100%;
    height:1.875rem;
    background-color: #D9D9D9;
    border-radius:40px;
  }
  .bar{
    height:1.875rem;
    background-color: #345995;
    border-radius:40px;
  }
</style>