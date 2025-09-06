<script lang="ts">
  import { AppealData } from "$lib/components/appeals/appealDataClass.svelte";
  import Start from "$lib/components/appeals/pages/Start.svelte";

  const appealData = new AppealData();
  const pageCount = 8;
  let pageIndex = $state<number>(0);
  const pageCompletions = $state<boolean[]>(Array(pageCount).fill(false));

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

<div class="sm-prose">
  <h1>SupportMail Appeals</h1>
</div>

<div class="mx-auto max-w-3xl">
  <Start data={appealData} show={pageIndex === 0} bind:inputsComplete={pageCompletions[pageIndex]} />
</div>

<div class="mt-4 flex justify-center gap-4 p-4">
  <button class="btn btn-primary" onclick={previousPage} disabled={pageIndex === 0}>Back</button>
  <button
    class="btn btn-primary"
    onclick={nextPage}
    disabled={pageIndex === pageCount - 1 || !pageCompletions[pageIndex]}
  >
    Next
  </button>
</div>
