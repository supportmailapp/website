import nodeAdpater from "@sveltejs/adapter-node";
import vercelAdapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const adapter =
  process.env.NODE_ENV === "production"
    ? vercelAdapter({
        split: true,
      })
    : nodeAdpater();

/** @type {import("@sveltejs/kit").Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter,
  },
};

export default config;
