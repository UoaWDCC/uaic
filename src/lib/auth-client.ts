import { createAuthClient } from "better-auth/react";

// Deliberately no hardcoded fallback here. Passing any truthy `baseURL` makes
// better-auth's client use it immediately (see `getBaseURL` in
// better-auth/dist/utils/url.mjs) - before it ever reaches its own safe
// `window.location.origin` fallback. That fallback already matches whatever
// domain the browser is actually on, so it's correct for Vercel Production,
// every unique Vercel Preview URL, and local dev alike, with no platform-
// specific code needed. `NEXT_PUBLIC_BETTER_AUTH_URL` is still honored when
// explicitly set (e.g. for a stable canonical Production URL); otherwise omit
// it and let this fall through.
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const { signIn, signUp, signOut, useSession } = authClient;
