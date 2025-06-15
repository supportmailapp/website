<script lang="ts">
  import { page } from "$app/state";
  import { m } from "$lib/paraglide/messages";
  import { localizeHref } from "$lib/paraglide/runtime";
</script>

<div class="error-container">
  <h1 class="text-xl font-semibold">{m["error.title"]()}</h1>
  <p class="text-sm">{m["error.description"]()}</p>
  <div class="mockup-code skeleton w-full max-w-[900px] text-start text-lg text-white">
    <pre data-prefix=">" class="text-warning text-base"><code>{page.error!.message}: {page.error!.status}</code></pre>
    <pre data-prefix=">" class="text-primary text-base"><code>{page.error!.route}</code></pre>
  </div>

  <a href={localizeHref("/")} class="btn btn-error btn-wide">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
    <span>{m["error.goBack"]()}</span>
  </a>
</div>

<style>
  .error-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: auto;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem 1rem;
    max-width: fit-content;
    width: auto;
  }
</style>
