import { paraglideMiddleware } from "$lib/paraglide/server";
import { type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const paraglideHandle: Handle = async ({ event, resolve }) =>
  paraglideMiddleware(event.request, function resolveLocalized({ request: localizedRequest, locale }) {
    event.request = localizedRequest;
    return resolve(event, {
      transformPageChunk: ({ html }) => {
        return html.replace("%lang%", locale);
      },
    });
  });

export const handle = sequence(paraglideHandle);

export async function handleError({ error, status, event, message }) {
  // if (status !== 404) console.error(`Error ${status}: ${message}`, error);
  console.error(`Error ${status}: ${message}`, error);
  return {
    status,
    message,
    route: event.url.pathname,
  };
}
