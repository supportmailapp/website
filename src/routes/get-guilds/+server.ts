import { building } from "$app/environment";
import { BOT_TOKEN } from "$env/static/private";
import { REST } from "@discordjs/rest";
import { json } from "@sveltejs/kit";
import { Routes, type APIInvite } from "discord-api-types/v10";
import { inspect } from "util";

export const prerender = true; // Render at build time

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

export async function GET() {
  // Prevent fetching data during regular requests; only allow during build or subrequests
  // if (!isSubRequest && !building) {
  //   return json(
  //     { error: "I'm a teapot" },
  //     {
  //       status: 418, // I'm a teapot
  //     },
  //   );
  // }

  if (!BOT_TOKEN) {
    console.error("Bot token not configured");
    return json({ error: "Bot token not configured" }, { status: 500 });
  }

  const rest = new REST({
    version: "10",
    userAgentAppendix: "Supportmail (https://supportmail.dev 3.0)",
    authPrefix: "Bot",
    globalRequestsPerSecond: 5,
    rejectOnRateLimit: (data) => {
      console.warn("Rate limited by Discord API", inspect(data, { depth: 3 }));
      return true;
    },
  }).setToken(BOT_TOKEN);
  const invites: APIInvite[] = [];
  for (const { code } of featuredInvites) {
    try {
      const invite = (await rest.get(`${Routes.invite(code)}?with_counts=true`)) as APIInvite;
      invites.push(invite);
    } catch (error) {
      console.error(`Failed to fetch invite for code ${code}:`, error);
    }
  }

  return json(
    invites.map(
      (i) =>
        ({
          code: i.code,
          channel: i.channel,
          guild: i.guild!,
          approximate_member_count: i.approximate_member_count ?? 0,
        }) satisfies MyInvite,
    ),
  );
}
