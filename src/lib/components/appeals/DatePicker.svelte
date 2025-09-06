<script lang="ts">
  import Fieldset from "./Fieldset.svelte";

  type Props = {
    label?: string;
    description?: string;
    value?: string;
    onChange?: (value: string) => void;
    min?: string;
    max?: string;
  };

  let { label, description = "", value = $bindable(""), min, max, onChange }: Props = $props();
</script>

<Fieldset legend={label} labelAbove={description}>
  <input
    type="date"
    class="input w-xs"
    oninput={(e) => {
      console.log("current value", e.currentTarget.value);
      value = e.currentTarget.value;
      onChange?.(e.currentTarget.value);
    }}
    {min}
    {max}
    bind:value
  />
</Fieldset>
