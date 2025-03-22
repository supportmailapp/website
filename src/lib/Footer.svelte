<script lang="ts">
  import { m } from "./paraglide/messages";
</script>

<footer class="bg-base-200 to-secondary/40 bg-gradient-to-b from-blue-950 from-10% py-5 select-none">
  <div class="container mx-auto px-4 text-white">
    <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
      <div class="flex items-center gap-2">
        <div class="avatar">
          <div class="size-10 rounded">
            <img src="/logo.png" alt="SupportMail Logo" />
          </div>
        </div>
        <span class="text-lg font-medium">SupportMail</span>
      </div>
      <p class="text-sm text-white/80">&copy; 2023-2025 {m["footer.rights"]()}</p>
      <a href="https://legal.supportmail.dev/" target="_blank" class="link link-hover text-white">{m["footer.legal"]()}</a>
    </div>
  </div>
</footer>
