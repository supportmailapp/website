<script lang="ts">
  let { additionalClasses = "" } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  class={"text-success mr-2 h-6 w-6 flex-shrink-0 " + additionalClasses}
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
</svg>
