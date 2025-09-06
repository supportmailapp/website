<script lang="ts">
  import { PUBLIC_DashboardUrl } from "$env/static/public";
  import { m } from "$lib/paraglide/messages";
  import { getLocale, locales, localizeHref, setLocale } from "$lib/paraglide/runtime";
  import { slide } from "svelte/transition";

  let isMenuOpen = $state(false);
  const languages: Record<string, string> = {
    en: "English",
    de: "Deutsch",
    fr: "Français",
  };

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
    const languageDialog = document.getElementById("language-modal");
    if (
      isMenuOpen &&
      !closeLanguageDialog?.contains(event.target) &&
      !toggleButton?.contains(event.target) &&
      !mobileMenu?.contains(event.target) &&
      !languageDialog?.contains(event.target)
    )
      toggleMenu();
  };

  interface Props {
    mode?: "default" | "appNavigation";
  }
  let { mode = "default" }: Props = $props();

  // Define nav items based on mode
  let primaryNav = $derived(
    mode === "default"
      ? [
          { href: localizeHref(PUBLIC_DashboardUrl), label: m["nav.dashboard"](), class: "nav-button" },
          { href: localizeHref("/premium"), label: m["nav.premium"](), class: "nav-button nav-button-premium" },
        ]
      : [
          { href: localizeHref("/mod/appeals"), label: "Appeal", class: "nav-button" },
          { href: localizeHref("/mod/reports"), label: "Report", class: "nav-button" },
        ],
  );

  let secondaryNav = $derived(
    mode === "default"
      ? [
          { href: "https://docs.supportmail.dev/", label: m["nav.docs"](), target: "_blank", class: "nav-link" },
          { href: localizeHref("/venocix"), label: m["nav.venocix"](), class: "nav-link venocix-hover" },
          { href: localizeHref("/about"), label: m["nav.about"](), class: "nav-link" },
        ]
      : [{ href: localizeHref("/logout"), label: m["nav.logout"](), class: "nav-link" }],
  );
</script>

<svelte:document onclick={handleClickOutside} />

<!-- Header -->
<header class="bg-base-200 sticky top-0 z-50 shadow-xl drop-shadow-md select-none">
  <div class="container mx-auto max-w-[1200px] px-4 py-3">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center transition-opacity duration-100 hover:opacity-70">
        <a href={localizeHref("/")} class="flex items-center gap-2 transition-colors duration-150 hover:text-white">
          <div class="avatar size-12">
            <img src="/assets/logo.png" alt="SupportMail Logo" class="mask mask-circle" />
          </div>
          <span class="text-2xl font-semibold">SupportMail</span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden items-center gap-6 backdrop-blur-md lg:flex">
        <!-- Primary Links (Buttons) -->
        <div class="flex items-center gap-3">
          {#each primaryNav as item}
            <a href={item.href} class={item.class}>{item.label}</a>
          {/each}
        </div>

        <!-- Separator -->
        <div class="bg-secondary/40 h-6 w-px"></div>

        <!-- Secondary Links (Text Links) -->
        <div class="flex items-center gap-4">
          {#each secondaryNav as item}
            <a href={item.href} target={item.target || ""} class={item.class}>{item.label}</a>
          {/each}
        </div>

        <!-- Separator -->
        <div class="bg-base-300 h-6 w-px"></div>

        <!-- Language Selector Dropdown -->
        <div class="dropdown dropdown-end dropdown-bottom">
          <div tabindex="0" role="button" class="btn btn-dash btn-sm gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 mt-2 w-40 gap-1 p-2 shadow-sm">
            {#each locales as locale}
              <li>
                <button
                  type="submit"
                  class="btn btn-sm btn-soft justify-center {getLocale() == locale ? 'btn-secondary btn-disabled' : ''}"
                  onclick={() => setLocale(locale)}
                >
                  {languages[locale]}
                </button>
              </li>
            {/each}
          </ul>
        </div>
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
    <div id="mobile-menu" class="mobile-menu" transition:slide={{ duration: 50, axis: "y" }}>
      <div class="container mx-auto flex flex-col gap-4 px-4 py-4 text-center">
        <!-- Primary Links -->
        <div class="border-base-300 flex flex-col gap-3 border-b pb-2">
          {#each primaryNav as item}
            <a href={item.href} class={item.class} onclick={toggleMenu}>{item.label}</a>
          {/each}
        </div>

        <!-- Secondary Links -->
        <div class="border-base-300 flex flex-col gap-3 border-b pb-2">
          {#each secondaryNav as item}
            <a href={item.href} target={item.target || ""} class={item.class} onclick={toggleMenu}>{item.label}</a>
          {/each}
        </div>

        <!-- Language Selector -->
        <div class="flex justify-center">
          <button class="btn btn-dash btn-md w-fit gap-1 px-4" onclick={toggleLanguageModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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
          <li class="flex w-full flex-row justify-center gap-1">
            <button
              class="btn btn-soft w-48 justify-center {getLocale() == locale ? 'btn-disabled' : ''}"
              onclick={() => setLocale(locale)}>{languages[locale]}</button
            >
          </li>
        {/each}
      </ul>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button id="close-language-dialog">X</button>
  </form>
</dialog>

<style>
  .venocix-hover:hover {
    /* Turn text green on hover */
    color: #a3d133;
  }
</style>
