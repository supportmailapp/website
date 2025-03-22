import { urls } from "$lib/constants.js";
import { redirect } from "@sveltejs/kit";

export const load = async function () {
  return redirect(302, urls.botAuth());
};
