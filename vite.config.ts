import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/lib/paraglide",
      strategy: ["url", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["de", "/de/:path(.*)?"],
            ["en", "/:path(.*)?"],
          ],
        },
      ],
    }),
  ],

  server: {
    port: 6060,
    host: "localhost",
    cors: {
      credentials: true,
    },
  },

  appType: "custom",
  logLevel: "info",
});
