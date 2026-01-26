import { EasterEgg, botAddUrl } from "$lib/constants.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  if (params.guildid !== "undefined") {
    redirect(302, botAddUrl(params.guildid));
  } else {
    redirect(302, EasterEgg);
  }
}
