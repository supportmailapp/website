<script lang="ts">
  import type { ClassValue } from "clsx";
  import Fieldset from "./Fieldset.svelte";

  type Props = {
    label?: string;
    descriptionAbove?: string;
    descriptionBelow?: string;
    type?: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
  };

  let {
    label,
    descriptionAbove,
    descriptionBelow,
    type = "text",
    value = $bindable(""),
    placeholder = "",
    required = false,
  }: Props = $props();
</script>

<Fieldset legend={label} labelAbove={descriptionAbove} labelBelow={descriptionBelow}>
  <input {type} class="input" bind:value {placeholder} {required} />
</Fieldset>
