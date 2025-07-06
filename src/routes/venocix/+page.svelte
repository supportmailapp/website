<script lang="ts">
  import Head from "$lib/Head.svelte";
  import { m } from "$lib/paraglide/messages";
</script>

<Head
  seo_config={{
    title: "Our Hosting Partner - Venocix",
    description: "Get a ",
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
        <p>Developer of SupportMail</p>
      </div>
    </div>
    <div class="text-6xl">🤝</div>
    <div class="avatar h-24">
      <img src="https://venocix.de/assets/img/logo-white.png" alt="Venocix Logo" />
    </div>
  </div>
  <div class="sm-prose">
    <h2>What is Venocix?</h2>
    <p>
      Venocix is a powerful hosting provider, based in Germany, which offers a range of services including VPS hosting, dedicated
      servers, domain registration, and more.
    </p>
    <h2>Why choose Venocix?</h2>
    <p>
      Venocix stands out due to its commitment to performance, reliability, and customer support. With data centers located in
      Germany, they ensure low latency and high-speed connections for users in Europe and beyond, while also ensuring compliance
      with strict EU data protection regulations.
    </p>
    <h2>How are they different?</h2>
    <p>
      Venocix differentiates itself by offering pre-paid hosting solutions, which means you can pay for your services upfront
      without the need for a credit card. This is particularly beneficial for users who prefer not to use traditional payment
      methods and want to maintain control over their expenses.
    </p>
    <p>
      This approach not only enhances security but also simplifies budgeting for users, making it easier to manage hosting costs
      without unexpected charges.
    </p>
    <h2>Where can I find out more?</h2>
    <p>
      You can learn more about Venocix and their services by visiting their official website at <a href="https://venocix.de"
        >venocix.de</a
      >.
    </p>
    <p>
      If you have any questions or need assistance, you can also reach out to them on their Discord server at <a
        href="https://discord.gg/Ca5qS5jbgV"
        class="link-hover"
      >
        discord.gg/Ca5qS5jbgV
      </a>
    </p>
    <h2>SupportMail and Venocix</h2>
    <p>
      SupportMail is proud to be hosted on Venocix, benefiting from their reliable infrastructure and excellent customer support.
      This partnership allows us to provide a seamless experience for our users, ensuring that our services are always available
      and performant.
    </p>
  </div>
  <!-- CTA -->
  <div class="grid w-full place-items-center">
    <div class="alert alert-soft alert-success alert-vertical alert-xl w-fit px-10 shadow-xl">
      <h2 class="text-2xl font-semibold">Interested in Venocix?</h2>
      <a href="https://venocix.de" class="btn btn-outline btn-lg btn-success">Get Started!</a>
    </div>
  </div>
</div>
