// Constants (Public)

import { env } from "$env/dynamic/public";

export const urls = {
  botAuth: function (clientId: string, guildId: string | null = null): string {
    const params = new URLSearchParams({
      client_id: env.PUBLIC_ClientId,
      permissions: env.PUBLIC_botPermissions,
      scope: "bot applications.commands",
      response_type: "code",
      redirect_uri: env.PUBLIC_discordRedirectUri,
    });
    if (guildId) params.append("guild_id", guildId);
    return "https://discord.com/oauth2/authorize?" + params.toString();
  },
};
