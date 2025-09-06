export async function load({ locals }) {
  const session = await locals.getSafeSession();
  return {
    loggedIn: Boolean(session.user && session.token),
    user: session.user,
  } as { loggedIn: true; user: NonNullable<typeof session.user> } | { loggedIn: false; user: null };
}
