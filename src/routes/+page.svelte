<script lang="ts">
  import { page } from "$app/state";
  import { formatNumber } from "$lib";
  import ModMailIcon from "$lib/assets/ModMailIcon.svelte";
  import ReportsIcon from "$lib/assets/ReportsIcon.svelte";
  import Head from "$lib/Head.svelte";
  import { m } from "$lib/paraglide/messages";
  import ServerCarousel from "$lib/ServerCarousel.svelte";
  import { blur, slide } from "svelte/transition";

  let { data } = $props();

  let stats = $derived(data.stats);
  let invites = $derived(data.invites);

  const features = $state(
    Array.from({
      length: 2,
    }).map((_, i) => {
      // Helper function to safely access dynamic message keys | This is a workaround for TypeScript
      const getMessage = (key: string) => {
        return ((m as unknown as Record<string, Function>)[key] || (() => key)) as () => string;
      };
      const key = `feature-${i}`;
      const id = getMessage(`${key}.id`)();
      const title = getMessage(`${key}.title`)();
      const description = getMessage(`${key}.description`)();
      const benefits = Array.from({
        length: 4,
      }).map((_, j) => getMessage(`${key}.benefit-${j}`)());
      return {
        id,
        title,
        description,
        benefits,
      };
    }),
  );

  const scrollDown = () => {
    const section = document.getElementById("servers");
    if (section) {
      const rect = section.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({
        top: scrollTop + rect.top - 64,
        behavior: "smooth",
      });
    }
  };

  $effect(() => {
    if (page.data.meta) {
      console.log("Page metadata:", page.data.meta);
    } else {
      console.warn("No metadata available in page data");
    }
  });
</script>

<Head
  seo_config={{
    title: m["app.title"](),
    description: m["app.description"](),
  }}
/>

<!-- Hero Section -->
<section class="hero from-base-100/90 min-h-screen bg-linear-to-b from-10% via-indigo-500/60 via-38% to-indigo-600/10">
  <div class="hero-content flex-col gap-14 text-center select-none">
    <div class="max-w-lg">
      <h1 class="text-5xl font-bold">SupportMail</h1>
      <p class="py-6 text-lg">{m["hero.description"]()}</p>
      <div class="flex flex-row justify-center gap-3">
        <a href={"/invite"} class="add-bot-btn">{m["nav.addBot"]()}</a>
        <div class="dropdown dropdown-bottom dropdown-end">
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <div tabindex="0" class="btn btn-soft btn-success btn-lg rounded-3xl">
            <span class="drop-shadow-md">{m["nav.getHelp"]()}</span>
          </div>
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <ul class="dropdown-content menu bg-base-100 rounded-box z-1 mt-2 w-52 p-2 shadow-sm">
            <li><a href="https://docs.supportmail.dev/" target="_blank">{m["nav.docs"]()}</a></li>
            <li><a href="https://help.supportmail.dev/" target="_blank">{m["nav.support"]()}</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="soft-success-card grid w-fit max-w-lg grid-cols-1 sm:grid-cols-2">
      <div class="flex flex-col items-center justify-center gap-3">
        <h1 class="text-xl font-semibold">{m["hero.ourHostingPartner"]()}</h1>
        <img src="https://venocix.de/assets/img/logo-white.png" class="mx-auto w-44" alt="Venocix Logo" />
      </div>
      <div class="flex flex-col items-center justify-center gap-1">
        <a href="https://venocix.de/" target="_blank" class="btn btn-outline btn-success">{m["hero.visitVenocix"]()}</a>
        <a href="/venocix" target="_self" class="btn btn-outline btn-success">{m["hero.readMore"]()}</a>
      </div>
    </div>
    <div class="mt-25 flex items-end justify-center">
      {#await new Promise((r) => setTimeout(() => r(true), 500))}
        <!-- Transparent placeholder -->
        <div class="size-10"></div>
      {:then}
        <button class="btn btn-square btn-outline" aria-label="Go down" onclick={scrollDown} transition:blur={{ duration: 300 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
            transition:slide={{ duration: 300, axis: "y" }}
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
          </svg>
        </button>
      {/await}
    </div>
  </div>
</section>

<section id="servers" class="to-base-100/50 bg-linear-to-b from-indigo-600/10 py-12 md:py-16">
  <div class="container mx-auto max-w-(--max-w) px-4">
    <div class="mb-10 text-center">
      <h2 class="mb-4 text-3xl font-bold md:text-4xl">In {formatNumber(stats.guilds, 100)} servers</h2>
    </div>

    <!-- Carousel -->
    <ServerCarousel {invites} />

    <div class="flex w-full justify-center">
      <a href="https://discord.gg/dH7z29AKd5" target="_blank" class="text-sm link link-hover link-primary transition-colors">
        Feature your server
      </a>
    </div>
  </div>
</section>

<!-- Statistics Section -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<section tabindex="0" id="statistics" class="from-base-100/50 bg-linear-to-b from-10% to-sky-800/40 to-70% md:py-16">
  <div class="container mx-auto max-w-(--max-w) px-4">
    <div class="mb-10 text-center">
      <h2 class="mb-4 text-3xl font-bold md:text-4xl">{m["stats.title"]()}</h2>
    </div>

    <div class="stats stats-vertical md:stats-horizontal bg-base-200 w-full shadow">
      <div class="stat">
        <div class="stat-figure text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <div class="stat-title">{m["stats.activeServers"]()}</div>
        <div class="stat-value text-primary">{formatNumber(stats.guilds, 10)}</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <div class="stat-title">{m["stats.usersServed"]()}</div>
        <div class="stat-value text-secondary">{formatNumber(stats.users)}</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div class="stat-title">{m["stats.ticketsProcessed"]()}</div>
        <div class="stat-value">{formatNumber(page.data.stats.tickets)}</div>
      </div>
    </div>

    <div class="mt-10 flex justify-center select-none">
      <a href="/stats" class="btn btn-outline btn-secondary">{m["stats.gotoHistoricalData"]()}</a>
    </div>
  </div>
</section>

<!-- Features Section -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<section tabindex="0" id="features" class="bg-linear-to-b from-sky-800/40 from-10% to-indigo-600/40 to-70% py-16">
  <div class="max-w-(900px) container mx-auto px-4">
    <div class="mb-16 text-center">
      <h2 class="mb-4 text-3xl font-bold md:text-4xl">{m.featuresTitle()}</h2>
      <p class="text-base-content/70 mx-auto max-w-2xl text-lg">
        {m.featuresDescription()}
      </p>
    </div>

    <div class="grid gap-8 md:grid-cols-2 md:gap-12">
      {#each features as feature}
        <div class="card bg-base-100 drop-shadow-md transition-shadow hover:shadow-lg">
          <div class="card-body">
            <div class="mb-4 flex items-center gap-4">
              {#if feature.id == "tickets"}
                <ModMailIcon />
              {:else if feature.id == "reports"}
                <ReportsIcon />
              {/if}
              <h3 class="card-title text-2xl">{feature.title}</h3>
            </div>
            <p class="text-base-content/80">{feature.description}</p>
            <ul class="mt-4 space-y-2">
              {#each feature.benefits as benefit}
                <li class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-success h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>{benefit}</span>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="bg-linear-to-b from-indigo-600/40 to-blue-400/40 to-60% py-16">
  <div class="container mx-auto px-4 text-center">
    <div class="mx-auto max-w-3xl">
      <h2 class="mb-6 text-3xl font-bold md:text-4xl">{m["cta.title"]()}</h2>
      <p class="text-base-content/80 mb-8 text-lg">
        {m["cta.description"]({ count: formatNumber(stats.guilds) })}
      </p>
      <div class="flex flex-col justify-center gap-4 sm:flex-row">
        <a href={"/invite"} class="add-bot-btn">{m["cta.addBot"]()}</a>
        <a href="https://docs.supportmail.dev/" target="_blank" class="btn btn-success btn-soft btn-lg"
          >{m["cta.readDocumentation"]()}</a
        >
      </div>
    </div>
  </div>
</section>
