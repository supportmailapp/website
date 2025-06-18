<script lang="ts">
  // import { onMount } from "svelte";

  // TODO: Find a way to close the window after a countdown (close doesn't work becauseof "Scripts may close only the windows that were opened by them")

  // let countdown = $state(5);

  // onMount(() => {
  //   const interval = setInterval(() => {
  //     countdown--;
  //     if (countdown <= 0) {
  //       clearInterval(interval);
  //       var customWindow = window.open("", "_blank", "");
  //       customWindow?.close();
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // });
</script>

<!-- <div class="flex flex-col items-center gap-4">
  <h2 class="text-success text-2xl font-bold">Login Successful!</h2>
  <p class="text-lg">You have successfully logged in to SupportMail.</p>
  <p class="text-sm text-slate-200">You can now return to Discord and close this page.</p>
</div> -->

<div class="bg-success text-success-content flex w-full max-w-lg flex-col rounded-xl p-4">
  <h1 class="text-2xl font-bold">Login Successful!</h1>
  <p class="text-lg">You have successfully logged in to SupportMail.</p>
  <p class="text-sm text-slate-800">You can now return to Discord and close this page.</p>
</div>
