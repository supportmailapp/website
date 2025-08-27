import { BOT_TOKEN, DB_ENCRYPTION_IV, DB_ENCRYPTION_KEY, mongoUri, OWNER_ID } from "$env/static/private";
import { makeCacheKey, redirectToLoginWithError } from "$lib";
import { paraglideMiddleware } from "$lib/paraglide/server";
import { SessionManager } from "$lib/server/auth";
import { dbConnect, DBUser, hasUserRole } from "$lib/server/db";
import { DiscordBotAPI, DiscordUserAPI } from "$lib/server/discord";
import { error, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { UserRole } from "supportmail-types";

export async function init() {
  await dbConnect(mongoUri);
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

// const baseAuth: Handle = async function ({ event, resolve }) {
//   event.locals.getSafeSession = async () => {
//     // Get session token from cookie or Authorization header
//     const cookieToken = event.cookies.get("session");
//     const authHeader = event.request.headers.get("Authorization");
//     const headerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

//     const sessionToken = cookieToken || headerToken;
//     if (!sessionToken) {
//       return { user: null, token: null, error: "notfound" };
//     }

//     // Check cache first
//     const cached = await event.platform?.env["sm-website-cache"].get<SafeSessionResult>(
//       makeCacheKey("sessiontoken", sessionToken),
//       "json",
//     );
//     if (cached) {
//       return cached;
//     }

//     const key = DB_ENCRYPTION_KEY;
//     const iv = DB_ENCRYPTION_IV;

//     try {
//       // Find session in database
//       const tokenResult = await SessionManager.getUserTokenBySession(sessionToken, key, iv);

//       if (tokenResult.isExpired()) {
//         const result: SafeSessionResult = { error: "expired", token: tokenResult.token, user: null };
//         await event.platform?.env["sm-website-cache"].put(makeCacheKey("sessiontoken", sessionToken), JSON.stringify(result), {
//           expirationTtl: 300,
//         });
//         return result;
//       } else if (!tokenResult.isFound()) {
//         return { user: null, token: null, error: "notfound" };
//       }

//       const { token } = tokenResult;

//       // Find user by session's userId
//       const userRes = await new DiscordUserAPI(token.accessToken).getCurrentUser();
//       if (!userRes.isSuccess()) {
//         console.log(userRes);
//         if (userRes.status === null && (userRes.error as any).code === "ENOTFOUND") {
//           return { user: null, token: null, error: "network" };
//         }
//         return { user: null, token: null, error: "other" };
//       }

//       const result: SafeSessionResult = { user: userRes.data, token: tokenResult.token };
//       // Cache successful results
//       await event.platform?.env["sm-website-cache"].put(makeCacheKey("sessiontoken", sessionToken), JSON.stringify(result), {
//         expirationTtl: 300,
//       });
//       return result;
//     } catch (error) {
//       console.error("Session validation error:", error);
//       return { user: null, token: null, error: "other" };
//     }
//   };

//   if (!event.url.pathname.startsWith("/app") && !event.url.pathname.startsWith("/login")) return resolve(event); // Skip for non-moderation and login routes

//   event.locals.discordRest = new DiscordBotAPI(BOT_TOKEN);

//   event.locals.isAuthenticated = () => Boolean(event.locals.user && event.locals.token);

//   // Consolidate: Get session data immediately instead of in separate handler
//   const sessionData = await event.locals.getSafeSession();
//   event.locals.user = sessionData.user;
//   event.locals.token = sessionData.token;

//   return resolve(event);
// };

// const moderationHandle: Handle = async ({ event, resolve }) => {
//   if (!event.url.pathname.startsWith("/app")) return resolve(event); // Skip for non-moderation routes

//   if (!event.locals.isAuthenticated() || !event.locals.user || !event.locals.token) {
//     return redirectToLoginWithError("You must be logged in to access this page.");
//   }

//   const ownerId = OWNER_ID;

//   // Ensure user is not the owner, as they have special permissions
//   if (event.locals.user.id === ownerId) {
//     event.locals.userRoles = [UserRole.Admin];
//     return resolve(event);
//   }

//   const userRolesStr = await event.platform?.env["sm-website-cache"].get(
//     makeCacheKey("userroles", event.locals.user.id),
//     "text",
//   );
//   if (!userRolesStr) {
//     const userRoles = ((await DBUser.findOne({ id: event.locals.user.id }, "roles").lean()) ??
//       []) as CachedUserRolesStringResult;
//     await event.platform?.env["sm-website-cache"].put(
//       makeCacheKey("userroles", event.locals.user.id),
//       JSON.stringify(userRoles),
//       { expirationTtl: 900 }, // Cache for 15 minutes
//     );

//     event.locals.userRoles = userRoles;
//   } else {
//     event.locals.userRoles = JSON.parse(userRolesStr) as CachedUserRolesStringResult;
//   }

//   event.locals.userRoles = event.locals.userRoles || [];

//   // check routes for permissions
//   const route = event.url.pathname;
//   if (
//     (route.startsWith("/app/admin") && !hasUserRole(event.locals.userRoles, UserRole.Admin)) ||
//     (route.startsWith("/app/appod") && !hasUserRole(event.locals.userRoles, UserRole.Moderator))
//   ) {
//     error(403, {
//       message: "You do not have permission to access this page.",
//       status: 403,
//       route,
//     });
//   }

//   return resolve(event);
// };

export const handle = sequence(paraglideHandle, devToolsHandle);

export async function handleError({ error, status, event, message }) {
  if (status !== 404) console.error(`Error ${status}: ${message}`, error);
  return {
    status,
    message,
    route: event.url.pathname,
  };
}
