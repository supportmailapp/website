import { deLocalizeUrl } from "$lib/paraglide/runtime";
import { paraglideMiddleware } from "$lib/paraglide/server";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const paraglideHandle: Handle = async ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
    event.request = localizedRequest;
    return resolve(event, {
      transformPageChunk: ({ html }) => {
        return html.replace("%lang%", locale);
      },
    });
  });

// For the funny ones...
const securityRegex = new RegExp(".*(\.env|config\/|config\.yml|config\.json|\.git|\.aws).*", "i");

const securityRedirectHandle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.includes("%20%20%20%20%22") || securityRegex.test(deLocalizeUrl(event.url).pathname)) {
    console.log(`Security check for "${event.url.pathname}" failed. IP:`, event.getClientAddress());
    redirect(303, "/add/undefined");
  }
  return resolve(event);
};

export const handle = sequence(securityRedirectHandle, paraglideHandle);

export async function handleError({ error, status, event, message }) {
  if (status !== 404) console.error(`Error ${status}: ${message}`, error);
  return {
    status,
    message,
    route: event.url.pathname,
  };
}
