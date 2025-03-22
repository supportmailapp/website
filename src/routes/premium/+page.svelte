<script lang="ts">
  import GreenCheckPlain from "$lib/assets/GreenCheckPlain.svelte";
  import { m } from "$lib/paraglide/messages";

  const getMessage = (key: string) => {
    return ((m as unknown as Record<string, Function>)[key] || (() => key)) as () => string;
  };

  const faqs = $state(
    Array.from({ length: 11 }).map((_, i) => {
      // Helper function to safely access dynamic message keys | This is a workaround for TypeScript
      const key = `premium-faq-${i}`;
      const question = getMessage(`${key}.question`)();
      const answer = getMessage(`${key}.answer`)();
      return { question, answer };
    }),
  );

  const benefits = $state({
    gold: Array.from({ length: 4 }).map((_, i) => getMessage(`premium.plan-gold.benefit-${i}`)()),
    diamond: Array.from({ length: 5 }).map((_, i) => getMessage(`premium.plan-diamond.benefit-${i}`)()),
  });

  // Function to handle the redirect to dashboard
  function redirectToDashboard() {
    window.location.href = "https://dashboard.supportmail.dev/?redirect=premium";
  }
</script>

<div class="bg-base-300">
  <div class="via-primary/50 to-primary/90 min-h-screen bg-gradient-to-br from-transparent to-90% px-4 py-12 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
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

      <div class="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        <!-- Basic Plan -->
        <div class="card bg-base-100 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div class="card-body">
            <h2
              class="card-title w-full bg-gradient-to-r from-amber-400 to-yellow-800 bg-clip-text text-center text-3xl font-bold text-transparent"
            >
              Gold
            </h2>
            <div class="my-4 flex justify-center">
              <span class="text-4xl font-bold">4€</span>
              <span class="mb-1 ml-1 self-end text-xl opacity-70">/month</span>
            </div>

            <div class="divider"></div>

            {@render featureBenefitList(benefits.gold)}

            <div class="card-actions mt-auto justify-center">
              <button class="btn btn-primary btn-lg w-full" onclick={redirectToDashboard}> Choose Server </button>
            </div>
          </div>
        </div>

        <!-- WhiteLabel Plan -->
        <div class="card bg-base-100 text-primary-content shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div class="absolute -top-4 right-4">
            <div class="badge badge-secondary px-4 py-3 text-sm font-bold">POPULAR</div>
          </div>
          <div class="card-body">
            <h2
              class="card-title w-full bg-gradient-to-l from-cyan-400 from-0% to-cyan-800 to-99% bg-clip-text text-center text-3xl font-bold text-transparent"
            >
              WhiteLabel Plan
            </h2>
            <div class="my-4 flex justify-center">
              <span class="text-4xl font-bold">10€</span>
              <span class="mb-1 ml-1 self-end text-xl opacity-70">/month</span>
            </div>

            <div class="divider"></div>

            {@render featureBenefitList(benefits.diamond)}

            <div class="card-actions mt-auto justify-center">
              <button class="btn btn-secondary btn-lg w-full" onclick={redirectToDashboard}> Choose Server </button>
            </div>
          </div>
        </div>
      </div>

      {#snippet faqCollapsable(summary: string, details: string)}
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <div tabindex="0" class="collapse-arrow bg-base-100 collapse mb-4">
          <input type="checkbox" class="peer" />
          <div class="collapse-title text-xl font-medium">{summary}</div>
          <div class="collapse-content">
            <p>{details}</p>
          </div>
        </div>
      {/snippet}

      <div class="mt-16 text-center select-none">
        <h3 id="faq" class="mb-4 text-2xl font-semibold">Frequently Asked Questions</h3>
        <div class="mx-auto max-w-3xl">
          {#each faqs as faq}
            {@render faqCollapsable(faq.question, faq.answer)}
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
