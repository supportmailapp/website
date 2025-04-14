import { SUPPORTMAIL_API_KEY } from "$env/static/private";

export const prerender = true;

declare type StatsResponse = { guilds: number; users: number; tickets: number };

const FALLBACK_STATS: StatsResponse = {
  guilds: 550,
  users: 180_000,
  tickets: 2_000,
};

export async function load() {
  const result = await fetch("https://api.supportmail.dev/stats", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${SUPPORTMAIL_API_KEY}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      if (res.status === 404) return FALLBACK_STATS;

      return res.json() as Promise<StatsResponse>;
    })
    .catch(() => FALLBACK_STATS);

  return {
    stats: result,
  };
}
