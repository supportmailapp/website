<script lang="ts">
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import Head from "$lib/components/Head.svelte";
  import { m } from "$lib/paraglide/messages";

  let { children } = $props();
  let error = $state<string | null>(null);

  $effect(() => {
    if (page.url.searchParams.has("error")) {
      error = page.url.searchParams.get("error") || "An unknown error occurred.";
      console.error("Login error:", error);
      goto("/login", { replaceState: true });
    }
  });
</script>

<Head
  seo_config={{
    title: m["login.title"](),
    description: m["login.description"](),
  }}
/>

<div id="bg" style="background-image: url(https://picsum.photos/1920/1080.webp);"></div>
<a
  href="https://picsum.photos/"
  target="_blank"
  rel="noopener noreferrer"
  class="text-opacity-50 absolute right-3 bottom-3 z-50 text-[0.6rem] text-slate-600 hover:text-slate-400"
>
  Photo by <b>Picsum Photos</b>
</a>

<div class="flex h-screen flex-col items-center justify-center gap-6 px-3">
  {#if !!error}
    <div class="alert alert-error w-full max-w-md">
      <h1>An error occurred!</h1>
      <pre>{error}</pre>
    </div>
  {/if}

  <div class="card card-bg w-full max-w-md shadow-xl shadow-black/40 backdrop-blur-2xl select-none">
    <div class="card-body py-4 text-center">
      {@render children()}
    </div>
  </div>
</div>

<style>
  #bg {
    width: 100%;
    height: 100%;
    position: absolute;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    object-fit: cover;
    backdrop-filter: blur(0.75vh);
    filter: blur(0.75vh);
    -webkit-filter: blur(0.75vh);
    box-shadow: 0 0 200px rgba(0, 0, 0, 0.9) inset;
    z-index: -1;
  }

  .card-bg {
    background: color-mix(in oklab, transparent 85%, black);
  }
</style>
