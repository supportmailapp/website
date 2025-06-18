<script lang="ts">
  import { m } from "$lib/paraglide/messages";

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

<div class="bg-success text-success-content flex w-full max-w-lg flex-col gap-1 rounded-xl p-4">
  <h1 class="text-2xl font-bold">{m["login.loginSuccess"]()}</h1>
  <p class="text-sm text-slate-800">{m["login.loginSuccessDescription"]()}</p>
</div>
