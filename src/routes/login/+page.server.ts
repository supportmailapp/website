import { urls } from "$lib/constants.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
  login: async ({ cookies, platform }) => {
    const state = crypto.randomUUID();

    const loginUrl = urls.botAuth("https://client-api.supportmail.dev", { state });

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
