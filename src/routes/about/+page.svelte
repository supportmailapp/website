<script lang="ts">
  import { getMessage, markdownToHtml } from "$lib";
  import { m } from "$lib/paraglide/messages";

  const features = $state([1, 2, 3, 4, 5, 6].map((i) => getMessage(`about.features-${i}`)()));
  const howTheBotWorksContent = $state(markdownToHtml(getMessage("about.howTheBotWorks_Content")(), true));
  const theTeamContent = $state(
    m["about.theTeam_Content"]()
      .split("\n")
      .map((s) => markdownToHtml(s, true)),
  );
</script>

<div class="container">
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

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: var(--dc-blurple);
    text-align: center;
    font-weight: bold;
  }

  h2,
  h3 {
    color: var(--color-primary);
    margin-bottom: 1rem;
    margin-top: 1.3rem;
    font-weight: 500;
  }

  h2 {
    font-size: 1.8rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  section {
    margin-block: 3rem;
  }

  .contact-section {
    gap: 5px;
  }

  p {
    line-height: 1.6;
    font-size: 1.1rem;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    margin-left: 2rem;

    li::before {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      background-color: var(--color-secondary);
      border-radius: 1rem;
      margin-right: 10px;
      left: -20px;
      top: 6px;
    }
  }

  li {
    margin: 0.5rem 0;
    line-height: 1.4;
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.5rem;
    }
  }
</style>
