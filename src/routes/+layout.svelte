<script lang="ts">
  import { fade } from "svelte/transition";
  import { expoIn, expoOut } from "svelte/easing";
  import { page } from "$app/state";
  import Footer from "$lib/Footer.svelte";
  import Navigation from "$lib/Navigation.svelte";
  import "../app.css";
  import { getLocale, locales, localizeHref } from "$lib/paraglide/runtime";
  import Head from "$lib/Head.svelte";
  import { m } from "$lib/paraglide/messages";

  let { children } = $props();

  let alertModalClosed = $state(false);
</script>

<Head
  seo_config={{
    url: new URL(page.url.pathname, page.url.origin).toString(),
    language: getLocale(),
  }}
/>

<div class="bg-base-100 flex min-h-screen flex-col">
  <Navigation />

  {#key page.url.pathname}
    <div class="relative flex-grow">
      <!-- Background grid pattern -->
      <div class="pointer-events-none absolute inset-0 opacity-70">
        <div
          class="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iY3VycmVudENvbG9yIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L3N2Zz4=')] bg-repeat"
        ></div>
      </div>

      <main
        class="relative z-10 flex-grow"
        in:fade={{ duration: 150, delay: 100, easing: expoIn }}
        out:fade={{ duration: 150, easing: expoOut }}
      >
        {@render children()}
      </main>
    </div>
  {/key}

  <!-- Footer -->
  <Footer />
</div>

<div style="display: none">
  {#each locales as locale}
    <a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
  {/each}
  <!-- svelte-ignore a11y_missing_attribute -->
  <a class="link link-info">text</a>
</div>

<!-- You can open the modal using ID.showModal() method -->
{#if !alertModalClosed}
  <dialog id="my_modal_3" class="modal modal-open" transition:fade={{ duration: 200 }}>
    <div class="modal-box bg-error-content text-error">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2" onclick={() => (alertModalClosed = true)}
          >✕</button
        >
      </form>
      <h3 class="text-lg font-bold">{m["alertTechnicalIssues.title"]()}</h3>
      <p class="py-4">{m["alertTechnicalIssues.description"]()}</p>
    </div>
    <form method="dialog" class="modal-backdrop backdrop-blur-md" onsubmit={() => (alertModalClosed = true)}>
      <button>close</button>
    </form>
  </dialog>
{/if}
