// Constants (Public)

import { dev } from "$app/environment";
import { PUBLIC_CLIENT_ID } from "$env/static/public";

export const AUTH_REDIRECT_URI = dev ? "http://localhost:3000/discord/callback" : "https://dash.supportmail.dev/login/callback";

// We will add the redirect uri when the dashboard is ready
export function botAddUrl(guildId: string | null = null): string {
  const params = new URLSearchParams({
    client_id: PUBLIC_CLIENT_ID,
    permissions: "1635040881911",
    scope: "bot applications.commands identify guilds guilds.members.read",
    redirect_uri: AUTH_REDIRECT_URI,
  });
  if (guildId) params.append("guild_id", guildId);
  return "https://discord.com/oauth2/authorize?" + params.toString();
}

export const legalHost = "https://legal.supportmail.dev";

export const legalLinks = {
  base: legalHost,
  terms: legalHost + "/terms",
  privacy: legalHost + "/privacy",
  withdrawal: legalHost + "/right-of-withdrawal",
  licenses: legalHost + "/licenses",
};

export const EasterEgg = "https://youtube.com/watch?v=dQw4w9WgXcQ"; // We all know where this leads...
