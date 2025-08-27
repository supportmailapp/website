// Private constants

import { env } from "$env/dynamic/private";
import { env as publicEnv } from "$env/dynamic/public";

export const authData = {
  algorithm: "HS256",
  expiresIn: "7d",
} as const;

export const discord = {
  clientId: publicEnv.PUBLIC_ClientId,
  clientSecret: env.CLIENT_SECRET,
  redirectUri: (origin: string) => origin + "/login/callback",
  baseScopes: ["identify", "guilds", "guilds.members.read"],
} as const;
