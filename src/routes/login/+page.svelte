<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  let showLoading = $state(false);
  let keepRefresh = $state(false);

  async function handleLogin() {
    showLoading = true;

    try {
      const url = keepRefresh ? "/login/get-url?keeprefresh=1" : "/login/get-url";
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json<any>();
        window.open(data.url || "/login?error=Something+went+wrong", "_self");
      } else {
        console.error("Response not ok:", response.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      showLoading = false;
    }
  }
</script>

<div class="grid place-items-center gap-5">
  <input
    type="checkbox"
    class="checkbox checkbox-primary checkbox-sm"
    id="keeprefresh"
    name="keeprefresh"
    bind:checked={keepRefresh}
  />
  <button type="button" class="btn btn-primary btn-soft w-full max-w-xs" disabled={showLoading} onclick={handleLogin}>
    {#if showLoading}
      <div class="loading-spinner loading size-8"></div>
    {:else}
      <img src="/icons/discord-mark-white.svg" alt="Discord Logo" class="size-8" />
    {/if}

    <span class="text-lg text-white">{showLoading ? "" : m["login.loginWithDiscord"]()}</span>
  </button>
  <p class="text-xs text-white">{m["login.loginDescription"]()}</p>
</div>
