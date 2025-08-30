<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  let autoLoginNextTime = $state(false);
</script>

<div class="grid place-items-center gap-5">
  <button
    type="submit"
    class="btn btn-primary btn-soft w-full max-w-xs"
    onclick={(e) => {
      e.preventDefault();
      open(`https://client-api.supportmail.dev/discord/login?autoLogin=${String(autoLoginNextTime)}`, "_self");
    }}
  >
    <img src="/icons/discord-mark-white.svg" alt="Discord Logo" class="size-8" />

    <span class="text-lg text-white">{m["login.loginWithDiscord"]()}</span>
  </button>
  <label class="label">
    <input type="checkbox" class="checkbox checkbox-sm checkbox-primary" bind:checked={autoLoginNextTime} />
    <span class="label-text text-xs text-white">{m["login.autoLoginNextTime"]()}</span>
  </label>
  <p class="text-xs text-white">{m["login.loginDescription"]()}</p>
</div>
