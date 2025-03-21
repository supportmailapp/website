<script lang="ts">
  import { blur, fade, slide } from "svelte/transition";
  import { locales, localizeHref, setLocale } from "$lib/paraglide/runtime";
  import { m } from "$lib/paraglide/messages";
  import ModMailIcon from "$lib/assets/ModMailIcon.svelte";
  import ReportsIcon from "$lib/assets/ReportsIcon.svelte";

  let isMenuOpen = $state(false);
  const languages: Record<string, string> = {
    en: "English",
    de: "Deutsch",
  };

  // Stats data for testing purposes
  const data = {
    servers: 553,
    users: 190123,
    tickets: 2341,
  };

  // Format large numbers with commas
  const formatNumber = (num: number, step = 100) => {
    // Round down to nearest step
    const roundedNum = Math.floor(num / step) * step;

    // Format with commas + '+'
    return roundedNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "+";
  };

  // Testimonials data
  const testimonials = [
    {
      quote:
        "This bot has completely transformed how we handle user support in our server. The modmail system is incredibly intuitive!",
      author: "Sarah K.",
      role: "Community Manager",
    },
    {
      quote:
        "The reporting feature has made it so much easier to maintain a healthy community. We can address issues faster than ever.",
      author: "Michael T.",
      role: "Server Admin",
    },
    {
      quote: "Setting up was a breeze, and the support team is always quick to help when needed. Highly recommend!",
      author: "Jamie L.",
      role: "Discord Moderator",
    },
  ];

  type KeyOfM = keyof typeof m;

  const features = $state(
    Array.from({ length: 2 }).map((_, i) => {
      const key = `feature-${i}`;
      const id = m[(key + ".id") as KeyOfM]();
      const title = m[(key + ".title") as KeyOfM]();
      const description = m[(key + ".description") as KeyOfM]();
      const benefits = Array.from({ length: 4 }).map((_, j) => m[(key + `.benefit-${j}`) as KeyOfM]());
      return { id, title, description, benefits };
    }),
  );

  // Toggle mobile menu
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };

  const toggleLanguageModal = () => {
    const modal = document.getElementById("language-modal") as HTMLDialogElement;
    if (modal.open) {
      modal.close();
    } else {
      modal.showModal();
    }
  };

  // Close mobile menu when clicking outside
  const handleClickOutside = (event: any) => {
    const toggleButton = document.getElementById("menu-button");
    const closeLanguageDialog = document.getElementById("close-language-dialog");
    const mobileMenu = document.getElementById("mobile-menu");
    if (
      isMenuOpen &&
      !closeLanguageDialog?.contains(event.target) &&
      !toggleButton?.contains(event.target) &&
      !mobileMenu?.contains(event.target)
    )
      toggleMenu();
  };

  const scrollToStatistics = () => {
    const statisticsSection = document.getElementById("statistics");
    if (statisticsSection) {
      const rect = statisticsSection.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({
        top: scrollTop + rect.top - 64,
        behavior: "smooth",
      });
    }
  };
</script>

<svelte:document onclick={handleClickOutside} />

<div class="bg-base-100 flex min-h-screen flex-col">
  <!-- Header -->
  <header class="bg-base-200 sticky top-0 z-50 shadow-xl backdrop-blur-md">
    <div class="container mx-auto max-w-(--max-w) px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <a href="/" class="flex items-center gap-2 transition-colors duration-150 hover:text-white">
            <div class="avatar size-14">
              <img src="/logo.png" alt="SupportMail Logo" class="mask mask-circle" />
            </div>
            <span class="text-3xl font-semibold">SupportMail</span>
          </a>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden items-center gap-6 backdrop-blur-md lg:flex">
          <!-- Language Selector Dropdown -->
          <div class="dropdown dropdown-end dropdown-bottom">
            <div tabindex="0" role="button" class="btn btn-dash btn-sm gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
            <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 mt-2 w-40 gap-1 p-2 shadow-sm">
              {#each locales as locale}
                <li>
                  <button
                    type="submit"
                    class="btn btn-ghost btn-sm justify-center hover:bg-slate-700/70"
                    onclick={() => setLocale(locale)}>{languages[locale]}</button
                  >
                </li>
              {/each}
            </ul>
          </div>
          <a href="https://docs.supportmail.dev/" target="_blank" class="nav-link">{m["nav.docs"]()}</a>
          <a href="/premium" class="nav-link nav-link-premium">{m["nav.premium"]()}</a>
          <a href="https://dashboard.supportmail.dev/" class="nav-button">{m["nav.dashboard"]()}</a>
        </nav>

        <!-- Mobile Menu Button -->
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button id="menu-button" class="btn btn-ghost btn-square rounded-lg lg:hidden" onclick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    {#if isMenuOpen}
      <div id="mobile-menu" class="mobile-menu" transition:fade={{ duration: 100, easing: (t) => t }}>
        <div class="container mx-auto flex flex-col gap-4 px-4 py-4 text-center">
          <a href="https://docs.supportmail.dev/" target="_blank" class="nav-link">{m["nav.docs"]()}</a>
          <a href="/premium" class="nav-link nav-link-premium">{m["nav.premium"]()}</a>

          <!-- Mobile Language Selector -->
          <div class="flex justify-center">
            <button class="btn btn-dash btn-md w-fit gap-1 px-4" onclick={toggleLanguageModal}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              {m["nav.language"]()}
            </button>
          </div>

          <a href="https://dashboard.supportmail.dev/" class="nav-button">{m["nav.dashboard"]()}</a>
        </div>
      </div>
    {/if}
  </header>

  <dialog id="language-modal" class="modal">
    <div class="modal-box max-h-[70%] items-center justify-center overflow-auto text-center">
      <h2 class="text-lg">{m["nav.selectLanguage"]()}</h2>
      <div class="menu bg-base-100 rounded-box z-[1] mt-2 w-full justify-center p-2 shadow">
        <ul class="flex w-full flex-col justify-center gap-2">
          {#each locales as locale}
            <li class="flex w-full flex-row justify-center">
              <button class="btn btn-soft w-48 justify-center" onclick={() => setLocale(locale)}>{languages[locale]}</button>
            </li>
          {/each}
        </ul>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button id="close-language-dialog">X</button>
    </form>
  </dialog>

  <main class="flex-grow">
    <!-- Hero Section -->
    <section
      class="hero bg-base-200 from-base-100 min-h-screen bg-linear-to-b from-10% via-indigo-500/60 via-38% to-indigo-600/10 to-95%"
    >
      <div class="hero-content flex-col text-center select-none">
        <div class="max-w-lg">
          <h1 class="text-5xl font-bold">SupportMail</h1>
          <p class="py-6 text-lg">{m["hero.description"]()}</p>
          <div class="flex flex-row justify-center gap-3">
            <a href="/add" class="btn btn-primary btn-lg min-w-40 rounded-3xl px-3 text-xl drop-shadow-md">{m["nav.addBot"]()}</a
            >
            <div class="dropdown dropdown-bottom dropdown-end">
              <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
              <div tabindex="0" class="btn btn-outline btn-lg rounded-3xl">{m["nav.getHelp"]()}</div>
              <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
              <ul class="dropdown-content menu bg-base-100 rounded-box z-1 mt-2 w-52 p-2 shadow-sm">
                <li><a href="https://docs.supportmail.dev/" target="_blank">{m["nav.docs"]()}</a></li>
                <li><a href="https://help.supportmail.dev/" target="_blank">{m["nav.support"]()}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mt-25 flex items-end justify-center">
          {#await new Promise((r) => setTimeout(() => r(true), 500))}
            <!-- Transparent placeholder -->
            <div class="size-10"></div>
          {:then}
            <button
              class="btn btn-square btn-outline"
              aria-label="Go down"
              onclick={scrollToStatistics}
              transition:blur={{ duration: 300 }}
            >
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

    <!-- Statistics Section -->
    <section id="statistics" class="bg-base-100 to-base-200 bg-linear-to-b from-indigo-600/7 from-20% py-12 md:py-16">
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
            <div class="stat-value text-primary">{formatNumber(data.servers, 50)}</div>
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
            <div class="stat-value text-secondary">{formatNumber(data.users)}</div>
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
            <div class="stat-value">{formatNumber(data.tickets)}</div>
          </div>
        </div>

        <div class="mt-10 flex justify-center select-none">
          <div class="badge badge-lg p-4">{m["stats.realTimeData"]()}</div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="bg-base-200 from-base-200 to-base-100 bg-gradient-to-b from-10% py-16">
      <div class="max-w-(900px) container mx-auto px-4">
        <div class="mb-16 text-center">
          <h2 class="mb-4 text-3xl font-bold md:text-4xl">{m.featuresTitle()}</h2>
          <p class="text-base-content/70 mx-auto max-w-2xl text-lg">
            {m.featuresDescription()}
          </p>
        </div>

        <div class="grid gap-8 md:grid-cols-2 md:gap-12">
          <!-- Feature 1: Modmail -->
          {#each features as feature}
            <div class="card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl">
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="text-success h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
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

    <!-- Testimonials Section -->
    <!-- <section class="container mx-auto max-w-(--max-w) px-4 py-16 md:py-24">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold md:text-4xl">{m["testimonials.title"]()}</h2>
        <p class="text-base-content/70 mx-auto max-w-2xl text-lg">
          {m["testimonials.description"]()}
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-3">
        {#each testimonials as testimonial, i}
          <div class="card bg-base-100 border-base-200 border transition-shadow hover:shadow-lg">
            <div class="card-body">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="text-primary/50 mb-4 h-8 w-8"
                viewBox="0 0 975.036 975.036"
              >
                <path
                  d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"
                ></path>
              </svg>
              <p class="text-base-content/80 mb-6 italic">{testimonial.quote}</p>
              <div class="mt-auto flex items-center gap-3">
                <div class="avatar placeholder">
                  <div class="bg-neutral-focus text-neutral-content w-10 rounded-full">
                    <span>{testimonial.author.charAt(0)}</span>
                  </div>
                </div>
                <div>
                  <p class="font-semibold">{testimonial.author}</p>
                  <p class="text-base-content/60 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section> -->

    <!-- CTA Section -->
    <section class="to-secondary/20 bg-gradient-to-b from-transparent py-16">
      <div class="container mx-auto px-4 text-center">
        <div class="mx-auto max-w-3xl">
          <h2 class="mb-6 text-3xl font-bold md:text-4xl">Ready to Transform Your Discord Server?</h2>
          <p class="text-base-content/80 mb-8 text-lg">
            Join the {formatNumber(data.servers)} servers that are already using our bot to improve their support and help their staff
            team.
          </p>
          <div class="flex flex-col justify-center gap-4 sm:flex-row">
            <a href="/add" class="btn btn-primary btn-lg">Add Bot to Server</a>
            <a href="https://docs.supportmail.dev/" target="_blank" class="btn btn-outline btn-lg">Read Documentation</a>
          </div>
        </div>
      </div>
    </section>
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
