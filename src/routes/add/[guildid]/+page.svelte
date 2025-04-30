<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { urls } from "$lib/constants";
  import { onMount } from "svelte";

  onMount(() => {
    goto(urls.botAuth(page.params.guildid));
  });
</script>

<svelte:head>
  <meta http-equiv="refresh" content="0; url=https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
</svelte:head>
