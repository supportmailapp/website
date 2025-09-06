<script lang="ts">
  import dayjs from "dayjs";
  import type { AppealData } from "../appealDataClass.svelte";
  import DatePicker from "../DatePicker.svelte";
  import SelectGroup from "../SelectGroup.svelte";
  import TextArea from "../TextArea.svelte";

  let {
    data,
    show = false,
    inputsComplete = $bindable(false),
  }: { data: AppealData; show?: boolean; inputsComplete?: boolean } = $props();

  $effect(() => {
    inputsComplete = !!data.banDate && dayjs(data.banDate).isBefore(dayjs()) && data.receivedErrorMsgs.size > 0;
  });
</script>

{#if show}
  <div class="sm-prose px-4">
    <h2>Ban Details</h2>
  </div>

  <DatePicker
    label="Since when does this error approximately occur?"
    description="If you are unsure, provide your best guess."
    bind:value={data.banDate}
    max={dayjs().format("YYYY-MM-DD")}
  />

  <SelectGroup
    label="What error message did you receive?"
    options={[
      { label: "Your access to this bot has been removed", value: "user_banned" },
      { label: "This server's access to this bot has been removed", value: "server_banned" },
      { label: "You are blacklisted from using this bot", value: "user_blacklisted" },
      { label: "You can't create new tickets in this server.", value: "cannot_create_tickets_in_server" },
      { label: "You are blacklisted.", value: "just_blacklisted" },
    ]}
    min={1}
    ordination="letter"
    values={data.receivedErrorMsgs}
  />

  <TextArea
    label="Which bot commands or features were you trying to using when banned?"
    bind:value={data.featureUsed}
  />
{/if}
