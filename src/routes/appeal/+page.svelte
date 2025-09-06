<script lang="ts">
  import { AppealData } from "$lib/components/appeals/appealDataClass.svelte";
  import Start from "$lib/components/appeals/pages/Start.svelte";

  const appealData = new AppealData();
  const pageCount = 8;
  let pageIndex = $state<number>(0);

  function nextPage() {
    if (pageIndex < pageCount - 1) {
      pageIndex += 1;
    }
  }
  function previousPage() {
    if (pageIndex > 0) {
      pageIndex -= 1;
    }
  }
</script>

{#if pageIndex === 0}
  <Start data={appealData} />
{/if}
