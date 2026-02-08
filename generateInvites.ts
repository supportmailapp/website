import { REST } from "@discordjs/rest";
import { Routes, type APIInvite } from "discord-api-types/v10";
import { inspect } from "util";
import { loadEnv, type Plugin } from "vite";

// name is just for identification purposes
const featuredInvites: { name: string; code: string }[] = [
  {
    name: "Booney",
    code: "sikky",
  },
  {
    name: "moose",
    code: "83JRy5KWrY",
  },
  {
    name: "Hi Anime",
    code: "hianime",
  },
  {
    name: "Sanctuary, Diablo 2 Trading & Community",
    code: "d2r",
  },
  {
    name: "Art of Poetry",
    code: "poetry",
  },
  {
    name: "Block by Block (MC Story Mode thing)",
    code: "blockbyblock",
  },
];

export default function generateInvitesFile(): Plugin {
  return {
    name: "generate-invites-file",
    async buildStart(this, options) {
      const BOT_TOKEN = process.env.BOT_TOKEN as string | undefined;
      if (!BOT_TOKEN) {
        console.error("[WARN] Bot token not configured");
        return;
      }

      const rest = new REST({
        version: "10",
        userAgentAppendix: "Supportmail (https://supportmail.dev 3.0)",
        authPrefix: "Bot",
        globalRequestsPerSecond: 5,
        rejectOnRateLimit: (data) => {
          console.warn("Rate limited by Discord API", inspect(data, { depth: 3 }));
          return false;
        },
      }).setToken(BOT_TOKEN);
      const invites: APIInvite[] = [];
      for (const { code } of featuredInvites) {
        try {
          const invite = (await rest.get(`${Routes.invite(code)}?with_counts=true`)) as APIInvite;
          invites.push(invite);
          if (code !== featuredInvites[featuredInvites.length - 1].code) {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second after the last request to ensure we don't hit rate limit (we got 6 invites and the limit is 5 req/s)
          }
        } catch (error) {
          console.error(`Failed to fetch invite for code ${code}:`, error);
        }
      }

      console.log(`Fetched ${invites.length} invites`);
      // save to file
      await options.fs.writeFile(
        "src/lib/server/invites/invites.ts",
        `export const invites = ${JSON.stringify(invites, null, 2)} as MyInvite[];`,
      );
      console.log("Invites file generated successfully");
      return;
    },
  };
}
