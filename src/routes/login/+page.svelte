<script lang="ts">
  import { enhance } from "$app/forms";

  let showLoading = $state(false);
</script>

<form
  class="grid place-items-center gap-6"
  method="POST"
  use:enhance={() => {
    showLoading = true;
    return ({ result }) => {
      console.log("Login result:", result);
      if (result.type === "success") {
        open((result.data?.url as string) || "/", "_self");
      } else {
        showLoading = false;
      }
    };
  }}
>
  <button type="submit" class="btn btn-primary btn-soft w-full max-w-xs" disabled={showLoading}>
    {#if showLoading}
      <div class="loading-spinner loading size-8"></div>
    {:else}
      <img src="/icons/discord-mark-white.svg" alt="Discord Logo" class="size-8" />
    {/if}

    <span class="text-lg text-white">{showLoading ? "Logging in..." : "Login with Discord"}</span>
  </button>
</form>
