<script>
  let {children} = $props();
  import { ProgressBar } from "@prgm/sveltekit-progress-bar";
</script>


<div class="progress-bar">
  <ProgressBar color="#345995" zIndex={10000} />
</div>

{@render children()}