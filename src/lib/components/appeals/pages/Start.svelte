<script lang="ts">
  import { SvelteSet } from "svelte/reactivity";
  import type { AppealData } from "../appealDataClass.svelte";
  import SelectGroup from "../SelectGroup.svelte";

  let { data }: { data: AppealData } = $props();

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
</script>

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

<p>{modes.find((mode) => mode.value === data.mode)?.label}</p>
