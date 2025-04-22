import { SUPPORTMAIL_API_KEY } from "$env/static/private";

export const prerender = true;

declare type StatsResponse = { guilds: number; users: number; tickets: number };

const FALLBACK_STATS: StatsResponse = {
  guilds: 580,
  users: 198_000,
  tickets: 2_030,
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

      const _data = res.json() as Promise<StatsResponse>;
      console.log("Fetched stats from SupportMail API", _data);
      return _data;
    })
    .catch(() => FALLBACK_STATS);

  return {
    stats: result,
  };
}
