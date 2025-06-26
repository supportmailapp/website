<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/state";
  import { m } from "$lib/paraglide/messages";

  let showLoading = $state(false);

  async function handleLogin() {
    showLoading = true;
    
    try {
      const response = await fetch('/login/get-url', {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        window.open(data.url || "/login?error=Something+went+wrong", "_self");
      } else {
        console.error('Response not ok:', response.status);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      showLoading = false;
    }
  }
</script>

<div class="grid place-items-center gap-5">
  <button 
    type="button" 
    class="btn btn-primary btn-soft w-full max-w-xs" 
    disabled={showLoading}
    onclick={handleLogin}
  >
    {#if showLoading}
      <div class="loading-spinner loading size-8"></div>
    {:else}
      <img src="/icons/discord-mark-white.svg" alt="Discord Logo" class="size-8" />
    {/if}

    <span class="text-lg text-white">{showLoading ? "" : m["login.loginWithDiscord"]()}</span>
  </button>
  <p class="text-xs text-white">{m["login.loginDescription"]()}</p>
</div>