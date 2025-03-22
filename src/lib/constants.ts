// Constants (Public)

import { PUBLIC_ClientId, PUBLIC_botPermissions, PUBLIC_legalHost } from "$env/static/public";

export const urls = {
  // We will enable th redirect uri when the dashboard is ready
  botAuth: function (guildId: string | null = null): string {
    const params = new URLSearchParams({
      client_id: PUBLIC_ClientId,
      permissions: PUBLIC_botPermissions,
      scope: "bot applications.commands",
      // response_type: "code",
      // redirect_uri: env.PUBLIC_discordRedirectUri,
    });
    if (guildId) params.append("guild_id", guildId);
    return "https://discord.com/oauth2/authorize?" + params.toString();
  },
};

export const legalLinks = {
  base: PUBLIC_legalHost,
  terms: PUBLIC_legalHost + "/terms",
  privacy: PUBLIC_legalHost + "/privacy",
  withdrawal: PUBLIC_legalHost + "/right-of-withdrawal",
};
