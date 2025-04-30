<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { urls } from "$lib/constants";
  import { onMount } from "svelte";

  onMount(() => {
    goto(urls.botAuth(page.params.guildid));
  });
</script>

<svelte:head>
  {#if page.params.guildid === "undefined"}
    <meta http-equiv="refresh" content="0; url=https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
  {/if}
</svelte:head>
