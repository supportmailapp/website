<script lang="ts">
  import { PUBLIC_CLIENT_ID } from "$env/static/public";
  import LinkArrow from "./assets/LinkArrow.svelte";
  import { legalLinks } from "./constants";
  import { m } from "./paraglide/messages";
  import { localizeHref } from "./paraglide/runtime";

  const footerContent = $state<{ title: string; links: string[][] }[]>([
    {
      title: m["footer.navigation"](),
      links: [
        [m["nav.home"](), localizeHref("/")],
        [m["nav.status"](), "https://status.supportmail.dev/"],
        [m["nav.premium"](), localizeHref("/premium")],
        [m["nav.docs"](), "https://docs.supportmail.dev/"],
        [m["nav.statistics"](), localizeHref("/stats")],
        [m["nav.dashboard"](), "https://dash.supportmail.dev/"],
      ],
    },
    {
      title: "SupportMail",
      links: [
        [m["nav.inviteBot"](), "/invite"],
        [m["nav.support"](), "https://help.supportmail.dev/"],
        [m["nav.topgg"](), "https://top.gg/bot/" + PUBLIC_CLIENT_ID],
        ["GitHub", "https://github.com/orgs/supportmailapp"],
      ],
    },
    {
      title: m["footer.legal"](),
      links: [
        [m["nav.legaNotice"](), legalLinks.base],
        [m["nav.terms"](), legalLinks.terms],
        [m["nav.privacy"](), legalLinks.privacy],
        [m["nav.rightOfWithdrawal"](), legalLinks.withdrawal],
        [m["nav.licenses"](), legalLinks.licenses],
      ],
    },
  ]);
</script>

<div
  id="footer"
  class="bg-base-300 text-base-content flex justify-center bg-linear-to-b to-transparent p-10 shadow-2xl shadow-slate-400"
>
  <footer class="footer sm:footer-horizontal w-full max-w-300">
    <aside style="user-select: none;">
      <div class="avatar">
        <div class="size-12 rounded">
          <img src="/assets/logo.png" alt="SupportMail Logo" />
        </div>
      </div>
      <p style="user-select: text;">
        &copy; 2023 - 2026
        <br />
        {m["footer.rightsReserved"]()}
      </p>
    </aside>

    {#snippet footerLink(text: string, href: string)}
      <a
        {href}
        target={href.startsWith("/") ? "_self" : "_blank"}
        rel="noopener noreferrer"
        class="link grid grid-flow-col place-items-center"
      >
        {text}
        {#if !href.startsWith("/")}
          <LinkArrow _class="size-4" />
        {/if}
      </a>
    {/snippet}

    {#each footerContent as { title, links }}
      <nav>
        <h6 class="footer-title">{title}</h6>
        {#each links as [text, href]}
          {@render footerLink(text, href)}
        {/each}
      </nav>
    {/each}
  </footer>
</div>

<style>
  .footer-title {
    user-select: none;
    -webkit-user-select: none;
  }

  .footer nav a {
    &.link {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
