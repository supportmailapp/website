<script lang="ts">
  import type { ClassValue } from "clsx";
  import Fieldset from "./Fieldset.svelte";
  import { cn } from "$lib";

  type Props = {
    label?: string;
    description?: string;
    type?: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
  };

  let { label, description, value = $bindable(""), placeholder = "", required = false }: Props = $props();
</script>

<Fieldset legend={label} labelAbove={description}>
  <textarea
    class={cn("textarea field-sizing-content min-h-[6rem] w-full resize-y rounded-xl")}
    bind:value
    {placeholder}
    {required}
  ></textarea>
</Fieldset>
