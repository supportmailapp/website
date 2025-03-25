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

const paraglideHandle: Handle = async ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
    event.request = localizedRequest;
    return resolve(event, {
      transformPageChunk: ({ html }) => {
        return html.replace("%lang%", locale);
      },
    });
  });

const legacyHandle: Handle = async ({ event, resolve }) => {
  const legacyUrl = legacyRoutes.get(event.url.pathname);
  if (legacyUrl) {
    redirect(301, legacyUrl);
  }
  return resolve(event);
};

export const handle = sequence(paraglideHandle, legacyHandle);

export async function handleError({ error, status, event, message }) {
  if (status !== 404) console.error(`Error ${status}: ${message}`, error);
  return {
    status,
    message,
    route: event.url.pathname,
  };
}
