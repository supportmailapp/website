// Constants (Public)

import { PUBLIC_botPermissions, PUBLIC_ClientId, PUBLIC_legalHost } from "$env/static/public";
import { Routes } from "discord-api-types/v10";

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
  botAuth: function (origin: string, { guildId, state, addBot }: { guildId?: string; state?: string; addBot?: boolean } = {}) {
    const url = new URL(Routes.oauth2Authorization(), this.base);
    const searchP = new URLSearchParams({
      client_id: PUBLIC_ClientId,
    });

    if (addBot) {
      searchP.set("scope", "bot applications.commands");
      searchP.set("permissions", PUBLIC_botPermissions);
      searchP.set("integration_type", "0");
    } else {
      searchP.set("scope", "identify guilds guilds.members.read");
      searchP.set("response_type", "code");
      searchP.set("redirect_uri", origin + "/discord/callback");
      searchP.set("prompt", "true");
    }
    if (state) searchP.set("state", state);
    if (guildId) searchP.set("guild_id", guildId);
    return url.toString() + `?${searchP.toString()}`;
  },
  token: () => "https://discord.com/api/oauth2/token",
  tokenRevocation: () => "https://discord.com/api/oauth2/token/revoke",
};

export const legalLinks = {
  base: PUBLIC_legalHost,
  terms: PUBLIC_legalHost + "/terms",
  privacy: PUBLIC_legalHost + "/privacy",
  withdrawal: PUBLIC_legalHost + "/right-of-withdrawal",
  licenses: PUBLIC_legalHost + "/licenses",
};

export const EasterEgg = "https://youtube.com/watch?v=dQw4w9WgXcQ"; // We all know where this leads...
