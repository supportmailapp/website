import { urls } from "$lib/constants.js";

export const actions = {
  login: async ({ cookies }) => {
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
