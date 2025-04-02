import { type Reroute } from "@sveltejs/kit";
import { deLocalizeUrl } from "$lib/paraglide/runtime";
import { browser } from "$app/environment";

export const reroute: Reroute = (request) => {
  if (browser) console.log(`Reroute ${request.url.pathname}`);
  const delocal = deLocalizeUrl(request.url).pathname;
  if (browser) console.log(`Delocalized to ${delocal}`);
  return delocal;
};
