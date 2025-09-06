<script lang="ts">
  import Head from "$lib/components/Head.svelte";
</script>

<Head
  seo_config={{
    title: "Report",
    description: "Report a DM to the SupportMail team",
  }}
/>

<div class="sm-prose container mx-auto px-4 py-8">
  <h1>Reporting a Direct Message</h1>

  <h2>When to report a DM</h2>

  <p>
    You should only report a DM to the SupportMail team if it contains content that violates our
    <a href="/terms" class="link link-hover">Terms of Service</a> or <a href="/privacy" class="link">Privacy Policy</a>.<br />
    Examples of reportable content include:
  </p>
  <ul>
    <li>Spam or unsolicited advertisements</li>
    <li>Harassment or abusive language</li>
    <li>Malicious links or phishing attempts</li>
    <li>Illegal content or activities</li>
    <li>Any other content that violates our policies</li>
  </ul>
  <span class="h-5"></span>
  <h2>How to report a DM</h2>
  <p>To report a DM, please follow these steps:</p>
  <ol>
    <li>
      <p class="flex flex-col items-center gap-2 sm:flex-row">
        <span>Add the <strong>SupportMail Notifier Bot</strong> as a user app.</span>
        <a class="btn btn-accent">Add SupportMail Notifier</a>
      </p>
      <img src="/assets/2to1_banner.png" alt="Apps menu screenshot" class="w-full rounded-lg shadow-lg sm:w-2/3" />
    </li>
    <li>
      <p>Use the <strong>Apps</strong> menu to report the DM.</p>
      <img src="/assets/2to1_banner.png" alt="Apps menu screenshot" class="w-full rounded-lg shadow-lg sm:w-2/3" />
    </li>
    <li>Fill out the report form with the necessary details and submit it.</li>
  </ol>

  <span class="divider divider-neutral my-2"></span>
  <h2>Why a User App?</h2>
  <p>
    This is the easiest way for you and the team, because it's integrated directly into your Discord and we can verify the report
    details more easily.
  </p>
  <p>
    If you have any questions or need further assistance, please contact us on our <a href="https://server.supportmail.dev"
      >Discord Server</a
    >.
  </p>
</div>
