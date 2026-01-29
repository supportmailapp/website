<script lang="ts">
  import { onMount } from "svelte";

  let { invites }: { invites: MyInvite[] } = $props();

  function durstenfeldShuffle<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  let guilds = $derived(
    durstenfeldShuffle(invites).map((i) => ({
      guildName: i.guild.name,
      guildIconUrl: `https://cdn.discordapp.com/icons/${i.guild.id}/${i.guild.icon}.webp?size=256`,
      inviteUrl: `https://discord.com/invite/${i.code}`,
      memberCount: i.approximate_member_count,
    })),
  );

  let trackElement: HTMLDivElement;
  let isPaused = $state(false);
  let currentIndex = $state(0);
  let offset = $state(0);

  const CARD_WIDTH = 270; // 250px + 20px gap
  const SPEED = 0.5;

  // Show enough items to fill the screen plus buffers on both sides
  let visibleGuilds = $derived.by(() => {
    const bufferSize = 10;
    let items = [];
    for (let i = 0; i < bufferSize; i++) {
      const index = (currentIndex + i) % guilds.length;
      // Add a unique iteration ID to ensure keys are stable but unique across duplicates
      items.push({ ...guilds[index], iterationId: currentIndex + i });
    }
    return items;
  });

  onMount(() => {
    let animationFrameId: number;
    let isMounted = true;

    function animate() {
      if (!isMounted) return;

      if (!isPaused) {
        offset += SPEED;

        // When we've scrolled past one card width, shift the array
        if (offset >= CARD_WIDTH) {
          offset = 0;
          currentIndex = (currentIndex + 1) % guilds.length;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      isMounted = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  });
</script>

{#snippet usersIcon()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-users-icon lucide-users inline-block size-5"
    ><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path
      d="M22 21v-2a4 4 0 0 0-3-3.87"
    /><circle cx="9" cy="7" r="4" /></svg
  >
{/snippet}

<div class="wrapper">
  <div class="carousel-container">
    <div
      role="list"
      class="carousel-track"
      bind:this={trackElement}
      onmouseenter={() => (isPaused = true)}
      onmouseleave={() => (isPaused = false)}
      onfocusin={() => (isPaused = true)}
      onfocusout={() => (isPaused = false)}
      style="transform: translateX(-{offset}px)"
    >
      {#each visibleGuilds as guild (guild.inviteUrl + guild.iterationId)}
        <a class="guild-card" href={guild.inviteUrl} target="_blank" rel="noopener noreferrer">
          <img class="guild-icon" src={guild.guildIconUrl} alt={`${guild.guildName} Icon`} loading="lazy" />
          <div class="guild-info">
            <h3 class="guild-name">{guild.guildName}</h3>
            <p class="member-count">
              {@render usersIcon()}
              {guild.memberCount}
            </p>
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>

<style>
  .wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    padding: 20px 0;
    margin-bottom: 4rem;
  }

  .carousel-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
  }

  .carousel-track {
    display: flex;
    gap: 20px;
  }

  .guild-card {
    flex: 0 0 auto;
    width: 250px;
    height: 100px;
    display: flex;
    gap: 8px;
    text-decoration: none;
    color: var(--color-secondary);
    border-radius: 8px;
    background: var(--color-secondary-content);
    padding: 16px;
    box-sizing: border-box;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    border: 2px solid transparent;
  }

  .guild-card:hover {
    border-color: var(--color-secondary);
  }

  .guild-icon {
    height: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 8px;
  }

  .guild-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 5px;
  }

  .guild-name {
    margin: 0;
  }

  .member-count {
    margin: 0;
    color: #b9bbbe;
  }
</style>
