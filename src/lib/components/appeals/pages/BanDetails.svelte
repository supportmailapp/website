<script lang="ts">
  import type { AppealData } from "../appealDataClass.svelte";

  let {
    data,
    show = false,
    inputsComplete = $bindable(false),
  }: { data: AppealData; show?: boolean; inputsComplete?: boolean } = $props();
</script>

{#if show}
  <div class="sm-prose p-4">
    <h2>Ban Details</h2>
  </div>
{/if}
