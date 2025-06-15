import { type Reroute } from "@sveltejs/kit";
import { deLocalizeUrl } from "$lib/paraglide/runtime";
import { browser } from "$app/environment";

export const reroute: Reroute = (request) => {
  if (browser) console.log(`[Browser] Reroute ${request.url.pathname}`);
  else console.log(`[Server] Reroute ${request.url.pathname}`);
  const delocal = deLocalizeUrl(request.url).pathname;
  if (browser) console.log(`[Browser] Delocalized to ${delocal}`);
  else console.log(`[Server] Delocalized to ${delocal}`);
  return delocal;
};
