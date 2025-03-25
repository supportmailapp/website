import { deLocalizeUrl } from "$lib/paraglide/runtime";
import { paraglideMiddleware } from "$lib/paraglide/server";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const legacyRoutes = new Map([
  ["/legal", "https://legal.supportmail.dev"],
  ["/invite", "https://help.supportmail.dev"],
  ["/server", "https://help.supportmail.dev/"],
  ["/pricing", "https://supportmail.dev/premium"],
  ["/privacy", "https://legal.supportmail.dev/privacy"],
  ["/terms", "https://legal.supportmail.dev/terms"],
]);

const legacyHandle: Handle = async ({ event, resolve }) => {
  const legacyUrl = legacyRoutes.get(deLocalizeUrl(event.url).pathname);
  if (legacyUrl) {
    console.log(`Redirecting ${event.url.pathname} to ${legacyUrl}`);
    redirect(301, legacyUrl);
  }
  return resolve(event);
};

const paraglideHandle: Handle = async ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
    event.request = localizedRequest;
    return resolve(event, {
      transformPageChunk: ({ html }) => {
        return html.replace("%lang%", locale);
      },
    });
  });

export const handle = sequence(legacyHandle, paraglideHandle);

export async function handleError({ error, status, event, message }) {
  if (status !== 404) console.error(`Error ${status}: ${message}`, error);
  return {
    status,
    message,
    route: event.url.pathname,
  };
}
