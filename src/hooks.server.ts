import { paraglideMiddleware } from "$lib/paraglide/server";
import type { Handle, Reroute } from "@sveltejs/kit";
import { deLocalizeUrl } from "$lib/paraglide/runtime";

export const reroute: Reroute = (request) => {
  return deLocalizeUrl(request.url).pathname;
};

// creating a handle to use the paraglide middleware
const paraglideHandle: Handle = async ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
    event.request = localizedRequest;
    return resolve(event, {
      transformPageChunk: ({ html }) => {
        return html.replace("%lang%", locale);
      },
    });
  });

export const handle = paraglideHandle;
