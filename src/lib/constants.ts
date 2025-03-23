// Constants (Public)

// import { PUBLIC_ClientId, PUBLIC_botPermissions, PUBLIC_legalHost } from "$env/static/public";
import { env } from "$env/dynamic/public";

export const urls = {
  // We will enable th redirect uri when the dashboard is ready
  botAuth: function (guildId: string | null = null): string {
    const params = new URLSearchParams({
      client_id: env.PUBLIC_ClientId,
      permissions: env.PUBLIC_botPermissions,
      scope: "bot applications.commands",
      // response_type: "code",
      // redirect_uri: env.PUBLIC_discordRedirectUri,
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
};
