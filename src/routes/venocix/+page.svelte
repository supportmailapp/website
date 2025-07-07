<script lang="ts">
  import { markdownToHtml } from "$lib";
  import Head from "$lib/Head.svelte";
  import { m } from "$lib/paraglide/messages";

  function parseMultipleLinesToHtml(input: string): string {
    return input
      .split("\n")
      .map((line) => `<p>${markdownToHtml(line, true)}</p>`)
      .join("");
  }

  const texts = {
    title: () => m["venocix.title"](),
    description: () => m["venocix.description"](),
    devOfSuppmail: () => `<p>${m["venocix.devOfSuppmail"]()}</p>`,
    whatIsV: () => `<h2>${m["venocix.whatIsV"]()}</h2>`,
    whatIsVContent: () => parseMultipleLinesToHtml(m["venocix.whatIsVContent"]()),
    whyV: () => `<h2>${m["venocix.whyV"]()}</h2>`,
    whyVContent: () => parseMultipleLinesToHtml(m["venocix.whyVContent"]()),
    howAreTheyDifferent: () => `<h2>${m["venocix.howAreTheyDifferent"]()}</h2>`,
    howAreTheyDifferentContent: () => parseMultipleLinesToHtml(m["venocix.howAreTheyDifferentContent"]()),
    suppmailAndVenocix: () => `<h2>${m["venocix.suppmailAndVenocix"]()}</h2>`,
    suppmailAndVenocixContent: () => parseMultipleLinesToHtml(m["venocix.suppmailAndVenocixContent"]()),
    whereMore: () => `<h2>${m["venocix.whereMore"]()}</h2>`,
    whereMoreContent: () => parseMultipleLinesToHtml(m["venocix.whereMoreContent"]()),
    ctaTitle: () => m["venocix.cta-title"](),
    ctaBtn: () => m["venocix.cta-btn"](),
  };
</script>

<Head
  seo_config={{
    title: texts.title(),
    description: texts.description(),
  }}
/>

<div class="container mx-auto mb-10 flex max-w-[1200px] flex-col gap-4 p-3">
  <div class="flex flex-col items-center justify-around gap-3 select-none md:flex-row">
    <div class="card flex-row">
      <div class="avatar rounded-full drop-shadow-md">
        <div class="size-24">
          <img src="https://lukez.sherpa.software/LukeZ.webp" alt="LukeZ Avatar" />
        </div>
      </div>
      <div class="card-body">
        <h2 class="card-title">LukeZ</h2>
        {@html texts.devOfSuppmail()}
      </div>
    </div>
    <div class="text-6xl">🤝</div>
    <div class="avatar h-24">
      <img src="https://venocix.de/assets/img/logo-white.png" alt="Venocix Logo" />
    </div>
  </div>
  <div class="sm-prose">
    {@html texts.whatIsV()}
    {@html texts.whatIsVContent()}
    {@html texts.whyV()}
    {@html texts.whyVContent()}
    {@html texts.howAreTheyDifferent()}
    {@html texts.howAreTheyDifferentContent()}
    {@html texts.suppmailAndVenocix()}
    {@html texts.suppmailAndVenocixContent()}
    {@html texts.whereMore()}
    {@html texts.whereMoreContent()}
  </div>
  <!-- CTA -->
  <div class="grid w-full place-items-center">
    <div class="alert alert-soft alert-success alert-vertical alert-xl w-fit px-10 shadow-xl">
      <h2 class="text-2xl font-semibold">{m["venocix.cta-title"]()}</h2>
      <a href="https://venocix.de" class="btn btn-outline btn-lg btn-success">{m["venocix.cta-btn"]()}</a>
    </div>
  </div>
</div>

<div class="hidden">
  <a href="/" class="link link-hover link-primary">X</a>
</div>
