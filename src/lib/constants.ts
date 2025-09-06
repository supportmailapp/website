// Constants (Public)

import { PUBLIC_botPermissions, PUBLIC_ClientId, PUBLIC_legalHost } from "$env/static/public";

export const urls = {
  base: "https://discord.com/api",
  // We will add the redirect uri when the dashboard is ready
  botAdd: function (guildId: string | null = null): string {
    const params = new URLSearchParams({
      client_id: PUBLIC_ClientId,
      permissions: PUBLIC_botPermissions,
      scope: "bot applications.commands",
    });
    if (guildId) params.append("guild_id", guildId);
    return "https://discord.com/oauth2/authorize?" + params.toString();
  },
  token: () => "https://discord.com/api/oauth2/token",
  tokenRevocation: () => "https://discord.com/api/oauth2/token/revoke",

  login: () => "https://client-api.supportmail.dev/discord/login",
  logout: () => "https://client-api.supportmail.dev/discord/logout",
};

export const legalLinks = {
  base: PUBLIC_legalHost,
  terms: PUBLIC_legalHost + "/terms",
  privacy: PUBLIC_legalHost + "/privacy",
  withdrawal: PUBLIC_legalHost + "/right-of-withdrawal",
  licenses: PUBLIC_legalHost + "/licenses",
};

export const EasterEgg = "https://youtube.com/watch?v=dQw4w9WgXcQ"; // We all know where this leads...
