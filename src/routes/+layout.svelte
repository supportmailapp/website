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
    <main
      class="flex-grow"
      in:fade={{ duration: 200, delay: 100, easing: cubicIn }}
      out:fade={{ duration: 200, easing: cubicOut }}
    >
      {@render children()}
    </main>
  {/key}

  <!-- Footer -->
  <Footer />
</div>
