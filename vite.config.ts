import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import devtoolsJson from "vite-plugin-devtools-json";
import { defineConfig, loadEnv } from "vite";
import generateInvites from "./generateInvites";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [
      generateInvites(),
      tailwindcss(),
      sveltekit(),
      devtoolsJson(),
      paraglideVitePlugin({
        project: "./project.inlang",
        outdir: "./src/lib/paraglide",
        strategy: ["url", "preferredLanguage", "baseLocale"],
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
  };
});
