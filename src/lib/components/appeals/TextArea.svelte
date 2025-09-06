<script lang="ts">
  import Fieldset from "./Fieldset.svelte";
  import { cn } from "$lib";
  import type { ClassValue } from "clsx";

  type Props = {
    label?: string;
    description?: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
    class?: ClassValue;
    resize?: "none" | "both" | "vertical" | "horizontal";
  };

  let {
    label,
    description,
    value = $bindable(""),
    placeholder = "",
    required = false,
    class: className,
    resize = "vertical",
  }: Props = $props();
</script>

<Fieldset legend={label} labelAbove={description}>
  <textarea
    class={cn("textarea field-sizing-content min-h-[6rem] w-full resize-y rounded-xl", className)}
    style:resize
    bind:value
    {placeholder}
    {required}
  ></textarea>
</Fieldset>
