import { browser, building } from "$app/environment";
import { SUPPORTMAIL_API_KEY } from "$env/static/private";

export const prerender = true;

declare type StatsResponse = { guilds: number; users: number; tickets: number; fallback?: true };

const FALLBACK_STATS: StatsResponse = {
  guilds: 580,
  users: 198_000,
  tickets: 2_030,
  fallback: true,
};

export async function load() {
  const result = building
    ? FALLBACK_STATS
    : await fetch("https://api.supportmail.dev/stats", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${SUPPORTMAIL_API_KEY}`,
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          if (res.status === 404) return FALLBACK_STATS;

          const _data = (await res.json()) as Promise<StatsResponse>;
          console.log("Fetched stats from SupportMail API", _data);
          return _data;
        })
        .catch(() => FALLBACK_STATS);

  return {
    stats: result,
  };
}
