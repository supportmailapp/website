import { EasterEgg } from "$lib/constants";
import { redirect } from "@sveltejs/kit";

export const prerender = false;

// This isn't a newsletter, this is an easter egg!

export async function GET() {
  redirect(301, EasterEgg);
}
