import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import devtoolsJson from "vite-plugin-devtools-json";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    devtoolsJson(),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/lib/paraglide",
      strategy: ["url", "preferredLanguage", "baseLocale"],
    }),
  ],

  appType: "custom",
  logLevel: "info",
});
