<script lang="ts">
  import { cn } from "$lib";
  import { SvelteSet } from "svelte/reactivity";
  import Fieldset from "./Fieldset.svelte";

  type Props = {
    label: string;
    description?: string;
    /**
     * The currently selected values.
     */
    values?: SvelteSet<string>;
    options?: { label: string; value: string }[];
    ordination?: "number" | "letter" | "none";
    /**
     * Minimum number of selections allowed.
     */
    min?: number;
    /**
     * Maximum number of selections allowed.
     */
    max?: number;
    showError?: boolean;
    onValueChange?: (values: string[]) => void;
  };

  let {
    label,
    description = "",
    values = new SvelteSet<string>(),
    options = [],
    ordination = "none",
    min = 0,
    max = options.length,
    showError = true,
    onValueChange,
  }: Props = $props();

  function toggleValue(option: string) {
    if (values.has(option)) {
      // Only remove if we won't go below minimum
      if (values.size > min) {
        values.delete(option);
      } else {
        error = `You must select at least ${min} option${min === 1 ? "" : "s"}.`;
        return;
      }
    } else if (!values.has(option)) {
      // Only add if we won't exceed maximum
      if (values.size < max) {
        values.add(option);
      } else if (max === 1 || values.size === 1) {
        values.clear();
        values.add(option);
      } else {
        error = `You can only select ${max} option${max === 1 ? "" : "s"}.`;
        return;
      }
    }
    error = "";
    onValueChange?.(Array.from(values.keys()));
  }

  let shouldShowError = $derived(showError && !(min === 1 && max === 1));

  let error = $state<string>("");
</script>

<Fieldset legend={label} labelAbove={description}>
  {#each options as option}
    <button
      class={cn(
        "btn btn-neutral h-auto min-h-9.5 w-fit justify-start rounded-lg py-1 text-start",
        values?.has(option.value) && "btn-primary",
      )}
      type="button"
      onclick={() => toggleValue(option.value)}
    >
      {#if ordination === "number"}
        <span class="badge badge-outline mr-2 aspect-square rounded">{options.indexOf(option) + 1}</span>
      {:else if ordination === "letter"}
        <span class="badge badge-outline mr-2 aspect-square rounded"
          >{String.fromCharCode(65 + options.indexOf(option))}</span
        >
      {/if}
      {option.label}
    </button>
  {/each}
  {#if error && shouldShowError}
    <p class="text-error text-sm">{error}</p>
  {/if}
</Fieldset>
