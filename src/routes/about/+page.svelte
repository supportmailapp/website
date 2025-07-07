<script lang="ts">
  import { getMessage, markdownToHtml } from "$lib";
  import Head from "$lib/Head.svelte";
  import { m } from "$lib/paraglide/messages";

  const features = $state([1, 2, 3, 4, 5, 6].map((i) => getMessage(`about.features-${i}`)()));
  const howTheBotWorksContent = $state(markdownToHtml(getMessage("about.howTheBotWorks_Content")(), true));
  const theTeamContent = $state(
    m["about.theTeam_Content"]()
      .split("\n")
      .map((s) => markdownToHtml(s, true)),
  );
</script>

<Head
  seo_config={{
    title: m["about.title"](),
    description: m["about.description"](),
  }}
/>

<div class="sm-prose container">
  <h1>{m["about.title"]()}</h1>

  <section class="about-section">
    <h2>{m["about.whatIs_Title"]()}</h2>
    <p>
      {m["about.whatIs_Content"]()}
    </p>
    <h3>{m["about.howTheBotWorks_Title"]()}</h3>
    <p>
      {@html howTheBotWorksContent}
    </p>

    <h3>{m["about.howDidItGetItsName_Title"]()}</h3>
    <p>
      {@html markdownToHtml(m["about.howDidItGetItsName_Content"](), true)}
    </p>
  </section>

  <section class="features-section">
    <h2>{m["about.features_Title"]()}</h2>
    <ul>
      {#each features as feature}
        <li>{feature}</li>
      {/each}
    </ul>
  </section>

  <section class="team-section">
    <h2>{m["about.theTeam_Title"]()}</h2>
    <div class="gap-4" style="display: grid; grid-template-columns: auto 1fr;">
      <div class="avatar size-16 overflow-hidden rounded-full shadow-md shadow-slate-700 select-none motion-safe:animate-pulse">
        <img
          src="https://cdn.discordapp.com/avatars/506893652266844162/3a65019030780dd4e610dda1f0973ffc.webp?size=512"
          alt="LukeZ Avatar"
        />
      </div>
      <div>
        {#each theTeamContent as content}
          <p>
            {@html content}
          </p>
        {/each}
      </div>
    </div>
  </section>

  <section class="contact-section">
    <h2>{m["about.contactMe_Title"]()}</h2>
    <p style="margin-bottom: 5px;">
      {@html markdownToHtml(m["about.contactMe_1"](), true)}
    </p>
    <p style="font-size: 0.9rem; opacity: 80%;">
      {@html markdownToHtml(m["about.contactMe_2"](), true)}
    </p>
  </section>
</div>

<style>
  .container {
    max-width: var(--max-w);
    margin-inline: auto;
    padding: 2rem 1rem;
    transition: all 100ms ease-in-out;
  }
</style>
