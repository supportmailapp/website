import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],

  server: {
    port: 6060,
    cors: {
      credentials: true,
    },
  },

  appType: "custom",
  logLevel: "info",
});
