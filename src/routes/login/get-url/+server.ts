import { env } from "$env/dynamic/private";
import { PUBLIC_ClientId } from "$env/static/public";
import { redirect } from "@sveltejs/kit";

function botAuth({ state }: { state: string }) {
  const url = new URL("https://discord.com/api/oauth2/authorize");
  const searchP = new URLSearchParams({
    client_id: PUBLIC_ClientId,
    scope: "identify guilds guilds.members.read",
    response_type: "code",
    prompt: "true",
    redirect_uri: env.ClientApiOrigin + "/discord/callback",
  });

  if (state) searchP.set("state", state);
  return url.toString() + `?${searchP.toString()}`;
}

export async function GET({ cookies, url }) {
  const searchParams = url.searchParams;
  const stayLoggedIn = searchParams.get("keeprefresh") === "1";
  const state = crypto.randomUUID();
  const cookiesDomain = ".supportmail.dev";
  cookies.set("state", state, { path: "/", sameSite: "lax", domain: cookiesDomain });
  cookies.set("keep-refresh-token", String(stayLoggedIn), { path: "/", sameSite: "lax", domain: cookiesDomain });
  console.log("State set in cookie:", state);
  if (searchParams.get("fromlogin") !== "1") {
    redirect(302, botAuth({ state })); // Redirect to Discord OAuth2 URL
  }

  return Response.json({
    url: botAuth({ state }),
  });
}
