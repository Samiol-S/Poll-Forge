<script>
  import Loader from "../../lib/components/Loader.svelte";
  let loaded = $state(false);
  setTimeout(() => {
    loaded = true;
  }, 5000)
</script>

<Loader loaded={loaded} />