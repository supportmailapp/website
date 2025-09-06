<script lang="ts">
  import Fieldset from "./Fieldset.svelte";

  type Props = {
    label?: string;
    descriptionAbove?: string;
    descriptionBelow?: string;
    type?: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
    minlength?: number;
    maxlength?: number;
    validation?: (v: string) => {
      valid: boolean;
      message?: string;
    };
  };

  let {
    label,
    descriptionAbove,
    descriptionBelow,
    type = "text",
    value = $bindable(""),
    placeholder = "",
    required = false,
    minlength = 0,
    maxlength,
    validation = () => ({ valid: true }),
  }: Props = $props();

  let error = $derived(validation(value));
</script>

<Fieldset legend={label} labelAbove={descriptionAbove} labelBelow={descriptionBelow}>
  <input {type} class="input" bind:value {placeholder} {required} {minlength} {maxlength} />
  {#if !error.valid}
    <p class="text-error text-sm">{error.message}</p>
  {/if}
</Fieldset>
