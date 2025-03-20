<script lang="ts">
  import "../app.css";
  import { m } from "$lib/paraglide/messages";

  let { children } = $props();
</script>

<svelte:head>
  <title>{m["app.title"]()}</title>
  <meta name="description" content={m["app.description"]()} />
</svelte:head>

{@render children()}
