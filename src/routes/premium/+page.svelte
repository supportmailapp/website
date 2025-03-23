<script lang="ts">
  import { PUBLIC_DashboardUrl } from "$env/static/public";
  import { markdownToHtml } from "$lib";
  import GreenCheckPlain from "$lib/assets/GreenCheckPlain.svelte";
  import { m } from "$lib/paraglide/messages";
  import { fade } from "svelte/transition";

  // Helper function to safely access dynamic message keys - utility function first
  const getMessage = (key: string) => {
    return ((m as unknown as Record<string, Function>)[key] || (() => key)) as () => string;
  };

  // Billing options and state
  const BillingOptions = ["Monthly", "Yearly"] as const;
  let BillingState = $state<(typeof BillingOptions)[number]>(BillingOptions[0]);
  // Derived state for billing
  let isMonthly = $derived(BillingState === BillingOptions[0]);

  // Plan benefits data
  const benefits = $state({
    gold: Array.from({ length: 4 }).map((_, i) => getMessage(`premium.plan-gold.benefit-${i}`)()),
    diamond: Array.from({ length: 5 }).map((_, i) => getMessage(`premium.plan-diamond.benefit-${i}`)()),
  });

  // FAQ data
  const faqs = $state(
    Array.from({ length: 11 }).map((_, i) => {
      const key = `premium-faq-${i}`;
      const question = getMessage(`${key}.question`)();
      const answer = getMessage(`${key}.answer`)();
      return { question, answer };
    }),
  );

  // Action function
  function redirectToDashboard() {
    window.location.href = PUBLIC_DashboardUrl + "?redirect=premium?plan=" + BillingState.toLowerCase();
  }
</script>

<div class="via-primary/50 to-primary/90 min-h-screen bg-gradient-to-br from-transparent to-90% px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">
    <div class="mb-5 flex w-full justify-center">
      <div role="alert" class="alert alert-warning alert-vertical max-w-7xl">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span class="text-center">{m["premium.warning"]()}</span>
      </div>
    </div>
    <div class="mb-12 text-center select-none">
      <h1 class="text-primary-content mb-4 text-4xl font-bold">{m["premium.choosePlan"]()}</h1>
      <p class="text-base-content mx-auto max-w-2xl text-xl opacity-80">
        {m["premium.description"]()}
      </p>
    </div>

    {#snippet featureBenefitList(_benefits: string[])}
      <ul class="mb-6 cursor-default space-y-3 select-none">
        {#each _benefits as benefit}
          <li class="flex transform items-start transition-all duration-100 hover:-translate-y-0.5">
            <GreenCheckPlain />
            <span>{benefit}</span>
          </li>
        {/each}
      </ul>
    {/snippet}

    <div class="mb-8 flex justify-center">
      <!-- Options -->
      <div class="grid w-full max-w-xs grid-cols-2 place-items-center justify-center gap-2 sm:grid-cols-3">
        <div class="flex w-full justify-end">
          <button class="btn animate-none {isMonthly ? 'btn-primary' : ''}" onclick={() => (BillingState = BillingOptions[0])}>
            {m["premium.monthly"]()}
          </button>
        </div>
        <input
          type="checkbox"
          checked={!isMonthly}
          class="toggle bg-primary checked:bg-primary checked:text-primary-content text-primary-content hidden border-0 sm:inline-grid"
          onchange={() => (BillingState = BillingState === BillingOptions[0] ? BillingOptions[1] : BillingOptions[0])}
        />
        <div class="flex w-full justify-start">
          <button class="btn animate-none {!isMonthly ? 'btn-primary' : ''}" onclick={() => (BillingState = BillingOptions[1])}>
            {m["premium.yearly"]()}
          </button>
        </div>
      </div>
    </div>

    <div class="mx-auto grid max-w-5xl grid-cols-1 justify-center gap-8 md:grid-cols-2">
      <!-- Basic Plan -->
      <div
        class="card bg-base-100 text-primary-content mx-auto w-full max-w-lg shadow-xl transition-all duration-300 hover:shadow-2xl"
      >
        {#if !isMonthly}
          <div class="absolute -top-4 right-4 select-none" transition:fade={{ duration: 150 }}>
            <div class="badge badge-error px-4 py-3 text-sm font-bold">{m["premium.saveMonths"]({ count: 1 })}</div>
          </div>
        {/if}
        <div class="card-body">
          <h2
            class="card-title bg-gradient-to-r from-amber-400 to-yellow-800 to-60% bg-clip-text text-center text-3xl font-bold text-transparent"
          >
            {m["premium.plan-gold.name"]()}
          </h2>
          <div class="mt-4 flex justify-center">
            <span class="text-4xl font-bold">
              {isMonthly ? m["premium.plan-gold.monthly"]() : m["premium.plan-gold.yearly"]()}
            </span>
            <span class="ml-1 self-end text-xl opacity-70">
              /{isMonthly ? m["premium.month"]() : m["premium.year"]()}
            </span>
          </div>
          {#if !isMonthly}
            <div class="mt-2 flex items-end justify-center opacity-65">
              <span class="text-xl font-bold">
                {m["premium.plan-gold.yearlyPerMonth"]()}
              </span>
              <span class="ml-1 text-sm opacity-70">/{m["premium.month"]()}</span>
            </div>
          {/if}

          <div class="divider"></div>

          {@render featureBenefitList(benefits.gold)}

          <div class="card-actions mt-auto justify-center">
            <button class="btn btn-success btn-soft btn-lg w-full" onclick={redirectToDashboard}
              >{m["premium.chooseServer"]()}</button
            >
          </div>
        </div>
      </div>

      <!-- WhiteLabel Plan -->
      <div
        class="card bg-base-100 text-primary-content mx-auto w-full max-w-lg shadow-xl transition-all duration-300 hover:shadow-2xl"
      >
        {#if !isMonthly}
          <div class="absolute -top-4 right-4 select-none" transition:fade={{ duration: 150 }}>
            <div class="badge badge-error px-4 py-3 text-sm font-bold">{m["premium.saveMonths"]({ count: 1 })}</div>
          </div>
        {/if}
        <div class="card-body">
          <h2
            class="card-title w-full bg-gradient-to-l from-cyan-300 from-60% to-cyan-600 bg-clip-text text-center text-3xl font-bold text-transparent"
          >
            {m["premium.plan-diamond.name"]()}
          </h2>
          <div class="mt-4 flex items-end justify-center">
            <span class="text-4xl font-bold">
              {isMonthly ? m["premium.plan-diamond.monthly"]() : m["premium.plan-diamond.yearly"]()}
            </span>
            <span class="ml-1 self-end text-xl opacity-70">
              /{isMonthly ? m["premium.month"]() : m["premium.year"]()}
            </span>
          </div>
          {#if !isMonthly}
            <div class="mt-2 flex justify-center opacity-65">
              <span class="text-xl font-bold">
                {m["premium.plan-diamond.yearlyPerMonth"]()}
              </span>
              <span class="ml-1 self-end text-sm opacity-70">/{m["premium.month"]()}</span>
            </div>
          {/if}

          <div class="divider"></div>

          {@render featureBenefitList(benefits.diamond)}

          <div class="card-actions mt-auto justify-center">
            <button class="btn btn-success btn-soft btn-lg w-full" onclick={redirectToDashboard}
              >{m["premium.chooseServer"]()}</button
            >
          </div>
        </div>
      </div>
    </div>

    {#snippet faqCollapsable(summary: string, details: string)}
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <div tabindex="0" class="collapse-arrow bg-base-100 collapse mb-4">
        <input type="checkbox" class="peer" />
        <div class="collapse-title text-xl font-medium">{summary}</div>
        <div class="collapse-content text-white/70 select-text">
          <p>{@html markdownToHtml(details)}</p>
        </div>
      </div>
    {/snippet}

    <div class="mt-16 text-center select-none">
      <h3 id="faq" class="mb-4 text-2xl font-semibold">{m.faq()}</h3>
      <div class="mx-auto max-w-3xl">
        {#each faqs as faq}
          {@render faqCollapsable(faq.question, faq.answer)}
        {/each}
      </div>
    </div>
  </div>
</div>
