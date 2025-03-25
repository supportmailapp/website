import { SUPPORTMAIL_API_KEY } from "$env/static/private";

declare type StatsResponse = { guilds: number; users: number; tickets: number };

export async function load() {
  const result = await fetch("https://api.supportmail.dev/stats", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${SUPPORTMAIL_API_KEY}`,
    },
  })
    .then((res) => res.json() as Promise<StatsResponse>)
    .catch(() => new Object() as StatsResponse);

  return {
    stats: result,
  };
}
