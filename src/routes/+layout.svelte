<script lang="ts">
  import { fade } from "svelte/transition";
  import { expoIn, expoOut } from "svelte/easing";
  import { page } from "$app/state";
  import Footer from "$lib/components/Footer.svelte";
  import Navigation from "$lib/components/Navigation.svelte";
  import "../app.css";
  import { deLocalizeHref, getLocale, locales, localizeHref } from "$lib/paraglide/runtime";
  import Head from "$lib/components/Head.svelte";

  let { children } = $props();
</script>

<Head
  seo_config={{
    url: new URL(page.url.pathname, page.url.origin).toString(),
    language: getLocale(),
  }}
/>

<div class="bg-base-100 flex min-h-screen flex-col">
  <Navigation mode={deLocalizeHref(page.url.pathname).startsWith("/app") ? "appNavigation" : "default"} />

  {#key page.url.pathname}
    <div class="relative flex-grow">
      <!-- Background grid pattern -->
      <div class="pointer-events-none absolute inset-0 opacity-70">
        <div class="via-primary/20 to-accent/20 h-full w-full bg-gradient-to-br from-gray-950/20 bg-repeat"></div>
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
