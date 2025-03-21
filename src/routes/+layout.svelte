<script lang="ts">
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

  <main class="flex-grow">
    {@render children()}
  </main>

  <!-- Footer -->
  <footer class="bg-base-200 from-secondary/35 to-secondary/90 bg-gradient-to-b from-10% py-5 select-none">
    <div class="container mx-auto px-4 text-white">
      <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div class="flex items-center gap-2">
          <div class="avatar">
            <div class="size-10 rounded">
              <img src="/logo.png" alt="SupportMail Logo" />
            </div>
          </div>
          <span class="text-lg font-medium">SupportMail</span>
        </div>
        <p class="text-sm text-white/80">&copy; 2023-2025 {m["footer.rights"]()}</p>
        <a href="https://legal.supportmail.dev/" target="_blank" class="link link-hover text-white">{m["footer.legal"]()}</a>
      </div>
    </div>
  </footer>
</div>
