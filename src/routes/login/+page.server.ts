import { env } from "$env/dynamic/private";
import { urls } from "$lib/constants.js";
import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  const { user } = await locals.getSafeSession();
  if (user) {
    return redirect(302, "/");
  }
}

export const actions = {
  login: async ({ cookies, url }) => {
    const state = crypto.randomUUID();

    const loginUrl = urls.botAuth(url.origin, { state });

    cookies.set("oauth_state", state, {
      path: "/",
      sameSite: "lax",
    });

    return {
      success: true,
      url: loginUrl,
    };
  },
};
