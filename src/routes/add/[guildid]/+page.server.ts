import { EasterEgg } from "$lib/constants.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  if (params.guildid === "undefined") {
    redirect(302, EasterEgg);
  }

  return {};
}
