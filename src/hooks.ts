import type { Reroute } from "@sveltejs/kit";
import { deLocalizeUrl } from "$lib/paraglide/runtime";

export const reroute: Reroute = (request) => {
  console.log(`Reroute ${request.url.pathname}`);
  const delocal = deLocalizeUrl(request.url).pathname;
  console.log(`Delocalized to ${delocal}`);
  return delocal;
};
