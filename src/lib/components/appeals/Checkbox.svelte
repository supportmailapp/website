<script lang="ts">
  import { cn } from "$lib";
  import Fieldset from "./Fieldset.svelte";

  type Props = {
    /**
     * The legend for the checkbox group.
     * Shown above the checkbox.
     */
    legend?: string;
    /**
     * The label for the checkbox.
     * Shown next to the checkbox.
     *
     * If not provided, only the checkbox will be shown.
     */
    label?: string;
    /**
     * The description for the checkbox.
     * Shown below the checkbox.
     */
    description?: string;
    checked?: boolean;
    required?: boolean;
  };

  let { legend, label, description, checked = $bindable(false), required = false }: Props = $props();
</script>

<Fieldset {legend} labelBelow={description} class="w-fit">
  <label class={cn("label transition-all duration-150", checked && "text-base-content")}>
    <input type="checkbox" class={cn("checkbox", checked && "checkbox-primary")} bind:checked {required} />
    {label}
  </label>
</Fieldset>
