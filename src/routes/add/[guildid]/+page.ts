import { page } from "$app/state";
import { urls } from "$lib/constants.js";
import { redirect } from "@sveltejs/kit";

export const prerender = false;

export async function load() {
  return redirect(302, urls.botAuth(page.params.guildid));
}
