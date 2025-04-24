import { EasterEgg } from "$lib/constants";
import { deLocalizeUrl, localizeHref } from "$lib/paraglide/runtime";
import { paraglideMiddleware } from "$lib/paraglide/server";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

// For the funny ones...
const securityRegex = new RegExp(".*(\.env|config\/|config\.yml|config\.json|\.git|\.aws).*", "i");

// Under construction; Removed for simplicity
const securityRedirectHandle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.includes("%20%20%20%20%22") || securityRegex.test(deLocalizeUrl(event.url).pathname)) {
    console.log(`Security check for "${event.url.pathname}" failed. IP:`, event.getClientAddress());
    return Response.json({ secret: EasterEgg }, { status: 200 });
  }
  return resolve(event);
};

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
