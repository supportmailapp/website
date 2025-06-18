import { PUBLIC_ClientId, PUBLIC_botPermissions } from "$env/static/public";

export const prerender = false; // Disable prerendering for this route

function botAuth({ state, isDev }: { state?: string; isDev?: boolean } = {}) {
  const url = new URL("https://discord.com/api/oauth2/authorize");
  const searchP = new URLSearchParams({
    client_id: PUBLIC_ClientId,
  });

  searchP.set("scope", "identify guilds guilds.members.read");
  searchP.set("response_type", "code");
  searchP.set("prompt", "true");

  if (state) searchP.set("state", state);
  if (isDev) {
    // This is the local development URL for the bot
    searchP.set("redirect_uri", "http://localhost:3000/discord/callback");
  } else {
    searchP.set("redirect_uri", "https://api.supportmail.dev/discord/callback");
  }
  return url.toString() + `?${searchP.toString()}`;
}

export const actions = {
  default: async function ({ cookies, request }) {
    const formData = await request.formData();
    const isDev = formData.get("dev") === "true";
    const stayLoggedIn = formData.get("stayLoggedIn") === "on"; // Currently unused
    const state = crypto.randomUUID();
    cookies.set("state", state, { path: "/" });
    cookies.set("keep-refresh-token", String(stayLoggedIn), { path: "/" });
    console.log("State set in cookie:", state);
    return {
      success: true,
      url: botAuth({ state }),
    };
  },
};
