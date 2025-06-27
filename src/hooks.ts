import { type Reroute } from "@sveltejs/kit";
import { deLocalizeUrl } from "$lib/paraglide/runtime";

export const reroute: Reroute = (request) => {
  const delocal = deLocalizeUrl(request.url).pathname;
  return delocal;
};
