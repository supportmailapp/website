declare type StatsResponse = { guilds: number; users: number; tickets: number };

export async function load({ platform }) {
  const result = await fetch("https://api.supportmail.dev/stats", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${platform?.env.SUPPORTMAIL_API_KEY}`,
    },
  })
    .then((res) => res.json() as Promise<StatsResponse>)
    .catch(() => new Object() as StatsResponse);

  return {
    stats: result,
  };
}
