import { env } from "$env/dynamic/private";

type StatsResponse = { guilds: number; users: number; tickets: number };

export async function load() {
  const result = await fetch("https://api.supportmail.dev/stats", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${env.SUPPORTMAIL_API_KEY}`,
    },
  })
    .then((res) => res.json() as Promise<StatsResponse>)
    .catch(() => new Object() as StatsResponse);

  return {
    stats: result,
  };
}
