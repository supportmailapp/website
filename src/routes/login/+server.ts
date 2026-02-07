import { redirect } from "@sveltejs/kit";

export async function GET() {
  redirect(302, "https://client-api.supportmail.dev/discord/login");
}
