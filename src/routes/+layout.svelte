<script lang="ts">
  import { fade } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { page } from "$app/state";
  import Footer from "$lib/Footer.svelte";
  import Navigation from "$lib/Navigation.svelte";
  import { m } from "$lib/paraglide/messages";
  import "../app.css";

  let { children } = $props();
</script>

<svelte:head>
  <title>{m["app.title"]()}</title>
  <meta name="description" content={m["app.description"]()} />
</svelte:head>

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
        in:fade={{ duration: 200, delay: 100, easing: cubicIn }}
        out:fade={{ duration: 200, easing: cubicOut }}
      >
        {@render children()}
      </main>
    </div>
  {/key}

  <!-- Footer -->
  <Footer />
</div>
