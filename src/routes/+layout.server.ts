import { building } from "$app/environment";
import { SUPPORTMAIL_API_KEY } from "$env/static/private";

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
            console.error("Failed to fetch stats from SupportMail API", res);
          }
          if (res.status === 404) return FALLBACK_STATS;

          const _data = (await res.json()) as Promise<StatsResponse>;
          console.log("Fetched stats from SupportMail API", _data);
          return _data;
        })
        .catch((err) => {
          console.error("Unknown Error fetching stats from SupportMail API", err);
          return FALLBACK_STATS;
        });

  return {
    stats: result,
  };
}
