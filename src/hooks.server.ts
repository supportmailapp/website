import { BOT_TOKEN, DB_ENCRYPTION_IV, DB_ENCRYPTION_KEY, MONGO_URI, OWNER_ID } from "$env/static/private";
import { makeCacheKey, redirectToLoginWithError } from "$lib";
import { paraglideMiddleware } from "$lib/paraglide/server";
import { SessionManager } from "$lib/server/auth";
import { dbConnect, DBUser, hasUserRole } from "$lib/server/db";
import { DiscordBotAPI, DiscordUserAPI } from "$lib/server/discord";
import { error, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { UserRole } from "supportmail-types";

export async function init() {
  await dbConnect(MONGO_URI);
}

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
    return new Response(null, { status: 404 });
  }
  return resolve(event);
};

const baseAuth: Handle = async function ({ event, resolve }) {
  event.locals.getSafeSession = async () => {
    // Get session token from cookie or Authorization header
    const cookieToken = event.cookies.get("session");
    const authHeader = event.request.headers.get("Authorization");
    const headerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

    const sessionToken = cookieToken || headerToken;
    if (!sessionToken) {
      return { user: null, token: null, error: "notfound" };
    }

    // Check cache first
    const cached = await event.platform?.env["sm-website-cache"].get<SafeSessionResult>(
      makeCacheKey("sessiontoken", sessionToken),
      "json",
    );
    if (cached) {
      return cached;
    }

    const key = DB_ENCRYPTION_KEY;
    const iv = DB_ENCRYPTION_IV;

    try {
      // Find session in database
      const tokenResult = await SessionManager.getUserTokenBySession(sessionToken, key, iv);

      if (tokenResult.isExpired()) {
        const result: SafeSessionResult = { error: "expired", token: tokenResult.token, user: null };
        await event.platform?.env["sm-website-cache"].put(
          makeCacheKey("sessiontoken", sessionToken),
          JSON.stringify(result),
          {
            expirationTtl: 300,
          },
        );
        return result;
      } else if (!tokenResult.isFound()) {
        return { user: null, token: null, error: "notfound" };
      }

      const { token } = tokenResult;

      // Find user by session's userId
      const userRes = await new DiscordUserAPI(token.accessToken).getCurrentUser();
      if (!userRes.isSuccess()) {
        console.log(userRes);
        if (userRes.status === null && (userRes.error as any).code === "ENOTFOUND") {
          return { user: null, token: null, error: "network" };
        }
        return { user: null, token: null, error: "other" };
      }

      const result: SafeSessionResult = { user: userRes.data, token: tokenResult.token };
      // Cache successful results
      await event.platform?.env["sm-website-cache"].put(
        makeCacheKey("sessiontoken", sessionToken),
        JSON.stringify(result),
        {
          expirationTtl: 300,
        },
      );
      return result;
    } catch (error) {
      console.error("Session validation error:", error);
      return { user: null, token: null, error: "other" };
    }
  };

  if (!event.url.pathname.startsWith("/app") && !event.url.pathname.startsWith("/login")) return resolve(event); // Skip for non-moderation and login routes

  event.locals.discordRest = new DiscordBotAPI(BOT_TOKEN);

  event.locals.isAuthenticated = () => Boolean(event.locals.user && event.locals.token);

  const sessionData = await event.locals.getSafeSession();
  event.locals.user = sessionData.user;
  event.locals.token = sessionData.token;

  return resolve(event);
};

export const handle = sequence(paraglideHandle, devToolsHandle, baseAuth);

export async function handleError({ error, status, event, message }) {
  if (status !== 404) console.error(`Error ${status}: ${message}`, error);
  return {
    status,
    message,
    route: event.url.pathname,
  };
}
