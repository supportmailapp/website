<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/state";
  import { m } from "$lib/paraglide/messages";

  let showLoading = $state(false);
</script>

<form
  class="grid place-items-center gap-5"
  method="POST"
  onsubmit={async (_e) => {
    _e.preventDefault();
    showLoading = true;
    const formData = new FormData(_e.target as HTMLFormElement);
    const response = await fetch(page.url, {
      method: "POST",
      body: formData,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    if (response.ok) {
      const data = await response.json();
      open(data.url || "/login?error=Something+went+wrong", "_self");
    }
  }}
>
  <input type="hidden" name="development" value={page.url.searchParams.get("dev") === "true"} />
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
