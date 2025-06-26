import { PUBLIC_ClientId_Dev, PUBLIC_ClientId_Prod } from "$env/static/public";

function botAuth({ state, isDev }: { state: string; isDev: boolean }) {
  const url = new URL("https://discord.com/api/oauth2/authorize");
  const searchP = new URLSearchParams({
    client_id: isDev ? PUBLIC_ClientId_Dev : PUBLIC_ClientId_Prod,
    scope: "identify guilds guilds.members.read",
    response_type: "code",
    prompt: "true",
    redirect_uri: isDev ? "http://localhost:3000/discord/callback" : "https://api.supportmail.dev/discord/callback",
  });

  if (state) searchP.set("state", state);
  return url.toString() + `?${searchP.toString()}`;
}

export async function GET({ cookies, url }) {
  const params = new URLSearchParams(url);
  const stayLoggedIn = params.get("stayLoggedIn") === "on";
  const state = crypto.randomUUID();
  const isDev = params.get("dev") === "true";
  const cookiesDomain = isDev ? "localhost" : ".supportmail.dev";
  cookies.set("state", state, { path: "/", sameSite: "lax", domain: cookiesDomain });
  cookies.set("keep-refresh-token", String(stayLoggedIn), { path: "/", sameSite: "lax", domain: cookiesDomain });
  console.log("State set in cookie:", state);
  return Response.json({
    url: botAuth({ state, isDev }),
  });
}
