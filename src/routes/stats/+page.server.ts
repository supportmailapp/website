import { building, dev } from "$app/environment";
import dummyData from "$lib/server/dummyData.js";
import dayjs from "dayjs";

type HistoryFetchResponse = {
  data: IHistoryStats[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: {
    after?: string;
    before?: string;
    aggregate?: "daily" | "weekly" | "monthly" | null;
  };
};

export async function load({ platform, url }) {
  const ClientAPIOrigin = platform?.env.ClientApiOrigin ?? "https://client-api.supportmail.dev";
  let metadata: StatsMetadata = { message: "No metadata available", status: "unknown" };
  let result: IHistoryStats[];

  const requestedSpan = url.searchParams.get("span");

  if (dev || building || !platform?.env.SUPPORTMAIL_API_KEY) {
    result = dev ? dummyData : [];
    metadata = {
      message: "App is building, in dev mode or no API key provided, using fallback stats history",
      status: "fallback",
    };
    return {
      history: result,
      meta: metadata,
    };
  }

  const fetchUrl = new URL(ClientAPIOrigin + "/stats/history");

  if (requestedSpan) {
    let beforeDate = dayjs().endOf("day");
    let afterDate: dayjs.Dayjs;
    switch (requestedSpan) {
      case "7d":
        afterDate = beforeDate.subtract(7, "days");
        break;
      case "30d":
        afterDate = beforeDate.subtract(30, "days");
        break;
      case "90d":
        afterDate = beforeDate.subtract(90, "days");
        break;
      case "180d":
        afterDate = beforeDate.subtract(180, "days");
        break;
      case "365d":
        afterDate = beforeDate.subtract(365, "days");
        break;
      default:
        afterDate = beforeDate.subtract(30, "days");
        break;
    }

    fetchUrl.searchParams.set("after", afterDate.toISOString());
    fetchUrl.searchParams.set("before", beforeDate.toISOString());
  }

  try {
    const fetchRes = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${platform.env.SUPPORTMAIL_API_KEY}`,
      },
    });

    if (!fetchRes.ok) {
      metadata = {
        message: `Failed to fetch stats history from API: ${fetchRes.status} ${fetchRes.statusText}`,
        status: fetchRes.status,
      };
      console.warn("Failed to fetch stats history from API", fetchRes);

      if (fetchRes.status === 404) {
        metadata = { message: "Stats history not found (404)", status: 404 };
        result = [];
      }
    }

    const _data = await fetchRes.json<HistoryFetchResponse>();
    metadata = { message: "Fetched stats history from API successfully", status: 200 };
    console.log("Fetched stats history from API", _data);
    result = _data.data;
  } catch (err) {
    metadata = { message: "Unknown Error fetching stats history from API", status: "unknown" };
    console.warn(metadata);
    console.error(err);
    result = [];
  }

  return {
    history: result,
    meta: metadata,
  };
}
