<script lang="ts">
  import { onMount } from "svelte";

  let { invites }: { invites: MyInvite[] } = $props();

  let guilds = $derived(
    invites.map((i) => ({
      guildName: i.guild.name,
      guildIconUrl: `https://cdn.discordapp.com/icons/${i.guild.id}/${i.guild.icon}.webp?size=256`,
      inviteUrl: `https://discord.gg/${i.code}`,
      memberCount: i.approximate_member_count,
    })),
  );

  // Duplicate guilds for infinite scroll effect
  let duplicatedGuilds = $derived([...guilds, ...guilds, ...guilds]);

  let trackElement: HTMLDivElement;
  let isPaused = $state(false);

  onMount(() => {
    const track = trackElement;
    let scrollAmount = 0;
    const speed = 0.5; // pixels per frame

    function animate() {
      if (!isPaused && track) {
        scrollAmount += speed;

        // Reset when we've scrolled through one full set
        const singleSetWidth = track.scrollWidth / 3;
        if (scrollAmount >= singleSetWidth) {
          scrollAmount = 0;
        }

        track.style.transform = `translateX(-${scrollAmount}px)`;
      }
      requestAnimationFrame(animate);
    }

    animate();
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
      class="carousel-track"
      bind:this={trackElement}
      onmouseenter={() => (isPaused = true)}
      onmouseleave={() => (isPaused = false)}
    >
      {#each duplicatedGuilds as guild, i}
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
