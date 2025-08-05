<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { m } from "$lib/paraglide/messages";
  import { onMount } from "svelte";

  let isDev = $derived(page.url.searchParams.get("dev") === "true");

  onMount(() => {
    if (browser) {
      const urlAfterLogin = localStorage.getItem("urlAfterLogin");
      if (urlAfterLogin) {
        goto(urlAfterLogin);
      }
    }
  });
</script>

<div class="bg-success text-success-content flex w-full max-w-lg flex-col gap-1 rounded-xl p-4">
  <h1 class="text-2xl font-bold">{m["login.loginSuccess"]()}</h1>
  <p class="text-sm text-slate-800">{m["login.loginSuccessDescription"]()}</p>
  {#if isDev}
    <p class="text-sm text-slate-800">Development Mode</p>
  {/if}
</div>
