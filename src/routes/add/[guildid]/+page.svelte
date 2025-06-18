<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { EasterEgg, urls } from "$lib/constants";
  import { onMount } from "svelte";

  const { data } = $props();

  onMount(() => {
    if (!data.easterEgg) goto(urls.botAdd(page.params.guildid));
  });
</script>

botAdd

<svelte:head>
  {#if data.easterEgg}
    <meta http-equiv="refresh" content="0; url={EasterEgg}" />
  {/if}
</svelte:head>
