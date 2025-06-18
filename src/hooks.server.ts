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

const devToolsHandle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith("/.well-known/appspecific/com.chrome.devtools.json")) {
    console.log("DevTools request received");
    return new Response();
  }
  return resolve(event);
};

export const handle = sequence(paraglideHandle, devToolsHandle);

export async function handleError({ error, status, event, message }) {
  // if (status !== 404) console.error(`Error ${status}: ${message}`, error);
  console.error(`Error ${status}: ${message}`, error);
  return {
    status,
    message,
    route: event.url.pathname,
  };
}
