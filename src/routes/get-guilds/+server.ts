import { BOT_TOKEN } from "$env/static/private";
import { REST } from "@discordjs/rest";
import { json } from "@sveltejs/kit";
import { Routes } from "discord-api-types/v10";

export const prerender = true; // Render at build time

const featuredInvites: { name: string; code: string }[] = [
  {
    name: "Kartoffelkissen",
    code: "kartoffelkissen",
  },
  {
    name: "test",
    code: "sikky",
  },
  {
    name: "moose",
    code: "83JRy5KWrY",
  },
];

export async function GET({ isSubRequest }) {
  if (!isSubRequest) {
    return new Response("I'm a teapot", {
      status: 418, // I'm a teapot
    });
  }

  if (!BOT_TOKEN) {
    console.error("Bot token not configured");
    return new Response("Bot token not configured", { status: 500 });
  }

  const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);
  const invites: MyInvite[] = [];
  for (const { code } of featuredInvites) {
    try {
      const invite = (await rest.get(`${Routes.invite(code)}?with_counts=true`)) as MyInvite;
      invites.push(invite);
    } catch (error) {
      console.error(`Failed to fetch invite for code ${code}:`, error);
    }
  }

  return json(invites);
}
