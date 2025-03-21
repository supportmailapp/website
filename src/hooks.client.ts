import { ClientLocalization } from "$lib";
import { deLocalizeUrl } from "$lib/paraglide/runtime";
import { overwriteSetLocale, overwriteGetLocale } from "$lib/paraglide/runtime";
import type { Reroute } from "@sveltejs/kit";

export async function init() {
  const locale = new ClientLocalization();
  overwriteGetLocale(() => locale.current);
  overwriteSetLocale((v) => (locale.current = v));
}

export const reroute: Reroute = (request) => {
  return deLocalizeUrl(request.url).pathname;
};
