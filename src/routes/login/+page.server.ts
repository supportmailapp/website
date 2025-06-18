import { env } from "$env/dynamic/public";

export const prerender = false; // Disable prerendering for this route

function botAuth({ guildId, state, addBot }: { guildId?: string; state?: string; addBot?: boolean } = {}) {
  const url = new URL("https://discord.com/api/oauth2/authorize");
  const searchP = new URLSearchParams({
    client_id: env.PUBLIC_ClientId,
  });

  if (addBot) {
    searchP.set("scope", "bot applications.commands");
    searchP.set("permissions", "1635040881911");
    searchP.set("integration_type", "0");
  } else {
    searchP.set("scope", "identify guilds guilds.members.read");
    searchP.set("response_type", "code");
    searchP.set("redirect_uri", "https://api.supportmail.dev/discord/callback");
    searchP.set("prompt", "true");
  }
  if (state) searchP.set("state", state);
  if (guildId) searchP.set("guild_id", guildId);
  return url.toString() + `?${searchP.toString()}`;
}

export const actions = {
  default: async function ({ cookies, request, url }) {
    const formData = await request.formData();
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
