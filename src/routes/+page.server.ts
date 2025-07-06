import { building } from "$app/environment";

const FALLBACK_STATS: StatsResponse = {
  guilds: 660,
  users: 216_414,
  tickets: 2_271,
  fallback: true,
};

export async function load({ platform, cookies }) {
  const ClientAPIOrigin = platform?.env.ClientApiOrigin ?? "https://client-api.supportmail.dev";

  const cookieStats = cookies.get("stats");
  let metadata: StatsMetadata = { message: "No metadata available", status: "unknown" };

  function handleCookieStats(stats: string): { valid: boolean; stats?: StatsResponse } {
    try {
      const parsedStats = JSON.parse(stats) as StatsResponse & { timestamp: string };

      // If older than 1 hour, we will fetch the stats from the API
      if (new Date(parsedStats.timestamp) < new Date(Date.now() - 60 * 60 * 1000)) {
        metadata = { message: "Stats cookie is older than 1 hour, fetching from API", status: "stale" };
        console.warn(metadata);
        return { valid: false };
      }

      if (parsedStats.fallback) {
        metadata = { message: "Using fallback stats from cookie", status: "fallback" };
        console.warn(metadata);
        return {
          stats: FALLBACK_STATS,
          valid: true,
        };
      }
      metadata = { message: "Using cached stats from cookie", status: 200 };
      console.log(metadata, parsedStats);
      return {
        stats: parsedStats,
        valid: true,
      };
    } catch (err) {
      console.error("Failed to parse stats from cookie", err);
      metadata = { message: "Failed to parse stats from cookie, fetching from API", status: "unknown" };
      // If parsing fails, we will fetch the stats from the API
      return { valid: false };
    }
  }

  const { valid, stats: cookieStatsParsed } = handleCookieStats(cookieStats ?? "");

  if (valid && cookieStatsParsed) {
    // If the cookie stats are valid, use them
    return {
      stats: cookieStatsParsed,
      meta: metadata,
    };
  }

  let result: StatsResponse;
  if (building || !platform?.env.SUPPORTMAIL_API_KEY) {
    result = FALLBACK_STATS;
    metadata = { message: "App is building or no API key provided, using fallback stats", status: "fallback" };
  } else {
    result = await fetch(ClientAPIOrigin + "/stats/current", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${platform.env.SUPPORTMAIL_API_KEY}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          metadata = {
            message: `Failed to fetch stats from API: ${res.status} ${res.statusText}`,
            status: res.status,
          };
          console.warn("Failed to fetch stats from API", res);

          if (res.status === 404) {
            metadata = { message: "Stats not found (404)", status: 404 };
            return { ...FALLBACK_STATS };
          }
        }

        const _data = await res.json<StatsResponse>();
        metadata = { message: "Fetched stats from API successfully", status: 200 };
        console.log("Fetched stats from API", _data);
        return {
          ..._data,
        };
      })
      .catch((err) => {
        metadata = { message: "Unknown Error fetching stats from API", status: "unknown" };
        console.warn(metadata, err);
        return { ...FALLBACK_STATS };
      });

    // Set data as cookie so we don't have to fetch it again next time the user visits this route
    cookies.set("stats", JSON.stringify(result), {
      path: "/",
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    });
  }

  return {
    stats: result,
    meta: metadata,
  };
}
