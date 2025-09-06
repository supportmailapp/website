<script lang="ts">
  import { SvelteSet } from "svelte/reactivity";
  import type { AppealData } from "../appealDataClass.svelte";
  import SelectGroup from "../SelectGroup.svelte";
  import Input from "../Input.svelte";
  import { markdownToHtml } from "$lib";

  let { data, show = false }: { data: AppealData; show?: boolean } = $props();

  const modes = [
    {
      value: "user",
      label: "Myself",
    },
    {
      value: "server",
      label: "My Server/Community (I'm the owner)",
    },
  ];

  const values = new SvelteSet<string>();

  const textContent = [
    "# SupportMail Appeals",
    "",
    "Welcome to SupportMail Appeals. Here you can try to get your or your server's access to the bot back.",
    "All submitted data is handled according to our [Terms of Service](https://legal.supportmail.dev/terms) and [Privacy Policy](https://legal.supportmail.dev/privacy).",
  ].join("\n");
</script>

{#if show}
  <div class="sm-prose p-4">
    {@html markdownToHtml(textContent, true)}
  </div>

  <SelectGroup
    label="For what do you appeal?"
    options={modes}
    min={1}
    max={1}
    {values}
    showError={false}
    onValueChange={(vals) => {
      data.mode = vals.includes("user") ? "user" : "server";
    }}
  />

  {#if data.mode === "server"}
    <Input bind:value={data.serverName} label="Server Name" />
    <Input bind:value={data.serverId} label="Server ID" />
  {/if}
{/if}
