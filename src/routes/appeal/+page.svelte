<script lang="ts">
  import { AppealData } from "$lib/components/appeals/appealDataClass.svelte";
  import BanDetails from "$lib/components/appeals/pages/BanDetails.svelte";
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

<div class="flex h-full flex-col justify-start">
  <div class="sm-prose p-4">
    <h1>SupportMail Appeals</h1>
  </div>

  <div class="mx-auto max-w-3xl">
    <Start data={appealData} show={pageIndex === 0} bind:inputsComplete={pageCompletions[0]} />
    <BanDetails data={appealData} show={pageIndex === 1} bind:inputsComplete={pageCompletions[1]} />
  </div>

  <div class="mt-auto flex justify-center gap-4 p-4">
    <button class="btn btn-primary" onclick={previousPage} disabled={pageIndex === 0}>Back</button>
    <button
      class="btn btn-primary"
      onclick={nextPage}
      disabled={pageIndex === pageCount - 1 || !pageCompletions[pageIndex]}
    >
      Next
    </button>
  </div>
</div>
