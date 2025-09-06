<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { urls } from "$lib/constants";
  import { m } from "$lib/paraglide/messages";
  import { onMount } from "svelte";

  let showLoading = $state(false);

  onMount(() => {
    const nextPath = page.url.searchParams.get("next");
    if (nextPath?.startsWith("/app/")) {
      goto(nextPath, { replaceState: true });
    }
  });
</script>

<form
  class="grid place-items-center gap-5"
  action="?/login"
  method="POST"
  onsubmit={(e) => {
    e.preventDefault();
    const nextHref = page.url.searchParams.get("next");
    if (nextHref?.startsWith("/app/")) {
      localStorage.setItem("urlAfterLogin", nextHref);
    }

    showLoading = true;
    window.open(urls.login(), "_self");
  }}
>
  <button type="submit" class="btn btn-primary btn-soft w-full max-w-xs" disabled={showLoading}>
    {#if showLoading}
      <div class="loading-spinner loading size-8"></div>
    {:else}
      <img src="/icons/discord-mark-white.svg" alt="Discord Logo" class="size-8" />
    {/if}

    <span class="text-lg text-white">{showLoading ? "" : m["login.loginWithDiscord"]()}</span>
  </button>
  <p class="text-xs text-white">{m["login.loginDescription"]()}</p>
</form>
