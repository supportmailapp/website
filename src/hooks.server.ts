import { paraglideMiddleware } from "$lib/paraglide/server";
import type { Handle } from "@sveltejs/kit";

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
