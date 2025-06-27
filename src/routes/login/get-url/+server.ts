import { PUBLIC_ClientId } from "$env/static/public";

function botAuth({ state }: { state: string }) {
  const url = new URL("https://discord.com/api/oauth2/authorize");
  const searchP = new URLSearchParams({
    client_id: PUBLIC_ClientId,
    scope: "identify guilds guilds.members.read",
    response_type: "code",
    prompt: "true",
    redirect_uri: "https://api.supportmail.dev/discord/callback",
  });

  if (state) searchP.set("state", state);
  return url.toString() + `?${searchP.toString()}`;
}

export async function GET({ cookies, request }) {
  const formData = await request.formData();
  const stayLoggedIn = formData.get("stayLoggedIn") === "on";
  const state = crypto.randomUUID();
  const cookiesDomain = ".supportmail.dev";
  cookies.set("state", state, { path: "/", sameSite: "lax", domain: cookiesDomain });
  cookies.set("keep-refresh-token", String(stayLoggedIn), { path: "/", sameSite: "lax", domain: cookiesDomain });
  console.log("State set in cookie:", state);
  return Response.json({
    url: botAuth({ state }),
  });
}
