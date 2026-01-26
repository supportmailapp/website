import { botAddUrl } from "$lib/constants.js";
import { redirect } from "@sveltejs/kit";

export async function load() {
  return redirect(302, botAddUrl());
}
