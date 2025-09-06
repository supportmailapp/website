<script lang="ts">
  import { cn } from "$lib";
  import type { ClassValue } from "clsx";
  import type { Snippet } from "svelte";

  type Props = {
    legend?: string;
    labelAbove?: string;
    labelBelow?: string;
    class?: ClassValue;
    children?: Snippet;
  };

  let { legend, labelAbove, labelBelow, children, class: className }: Props = $props();
</script>

<fieldset class={cn("fieldset p-4", className)}>
  {#if legend}
    <p class="text-base-content text-lg font-semibold">{legend}</p>
  {/if}
  {#if labelAbove}
    <span class="label">{labelAbove}</span>
  {/if}
  {@render children?.()}
  {#if labelBelow}
    <span class="label">{labelBelow}</span>
  {/if}
</fieldset>
