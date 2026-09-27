import type { PayloadRequest } from "payload";

/**
 * Resolves the Member behind a request from its Better Auth session.
 *
 * Payload's own `req.user` is no help here: `Users` is the only collection with
 * `auth: true`, so `req.user` is only ever an admin/exec login. Member sessions
 * live entirely in Better Auth, which means anything that needs to know "which
 * member is this" has to read the session off the request headers itself.
 *
 * Returns the member's id, or null when the request carries no usable session -
 * callers are expected to treat null as "not a member" and deny.
 */
export async function getMemberIdFromRequest(req: PayloadRequest): Promise<string | null> {
  // Local API calls (payload.find() from server code) synthesise a req with no
  // headers. There's no session to read in that case.
  if (!req.headers) {
    return null;
  }

  try {
    // Imported lazily on purpose. `src/lib/auth.ts` constructs a MongoClient at
    // module scope, so a top-level import would drag Better Auth and a live
    // database connection into the Payload config graph - which is also loaded
    // by `npm run generate:types` and by `next build`, where DATABASE_URI may
    // not be set.
    const { auth } = await import("./auth");
    const session = await auth.api.getSession({ headers: req.headers });

    // Better Auth is configured with `generateId: false` and `modelName:
    // "members"`, so its user documents *are* the documents behind Payload's
    // `member` collection - same Mongo collection, same _id. That makes
    // session.user.id directly usable as a Member id, with no second lookup.
    return session?.user?.id ?? null;
  } catch {
    // A malformed or expired cookie shouldn't 500 a read - fail closed instead.
    return null;
  }
}
