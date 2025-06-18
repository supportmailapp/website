// Constants (Public)

import * as env from "$env/static/public";

export const urls = {
  // We will enable th redirect uri when the dashboard is ready
  botAdd: function (guildId: string | null = null): string {
    const params = new URLSearchParams({
      client_id: env.PUBLIC_ClientId,
      permissions: env.PUBLIC_botPermissions,
      scope: "bot applications.commands",
    });
    if (guildId) params.append("guild_id", guildId);
    return "https://discord.com/oauth2/authorize?" + params.toString();
  },
};

export const legalLinks = {
  base: env.PUBLIC_legalHost,
  terms: env.PUBLIC_legalHost + "/terms",
  privacy: env.PUBLIC_legalHost + "/privacy",
  withdrawal: env.PUBLIC_legalHost + "/right-of-withdrawal",
  licenses: env.PUBLIC_legalHost + "/licenses",
};

export const EasterEgg = "https://youtube.com/watch?v=dQw4w9WgXcQ"; // We all know where this leads...
