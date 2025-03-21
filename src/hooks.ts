import type { Reroute } from "@sveltejs/kit";
import { ClientLocalization } from "$lib";
import { deLocalizeUrl, overwriteGetLocale, overwriteSetLocale } from "$lib/paraglide/runtime";

export async function init() {
  const locale = new ClientLocalization();
  overwriteGetLocale(() => locale.current);
  overwriteSetLocale((v) => (locale.current = v));
}

export const reroute: Reroute = (request) => {
  return deLocalizeUrl(request.url).pathname;
};
