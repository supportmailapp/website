import { building } from "$app/environment";

declare type StatsResponse = { guilds: number; users: number; tickets: number; fallback?: true };

const FALLBACK_STATS: StatsResponse = {
  guilds: 660,
  users: 216_300,
  tickets: 2_300,
  fallback: true,
};

export async function load({ platform }) {
  const result =
    building && platform?.env.SUPPORTMAIL_API_KEY
      ? FALLBACK_STATS
      : await fetch("https://api.supportmail.dev/stats/current", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${platform?.env.SUPPORTMAIL_API_KEY}`,
          },
        })
          .then(async (res) => {
            if (!res.ok) {
              console.error("Failed to fetch stats from SupportMail API", res);
            }
            if (res.status === 404) return FALLBACK_STATS;

            const _data = await res.json<StatsResponse>();
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
