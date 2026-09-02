# Tests

Two tiers of test live in this repo, run together via `pnpm test` (see the
root `README.md` for the commands). Most tests should be **colocated**, not
placed here - this folder is only for tests that don't belong to one file.

## Unit tests

Colocated with the code they cover, as `*.test.ts(x)` next to the source
file (e.g. `src/components/bulletin/AllArticles.test.tsx` next to
`AllArticles.tsx`). A unit test covers a plain function - deterministic, no
rendering, no database, no network. See that file for an example.

## Integration tests (`tests/integration/`)

An integration test exercises multiple real pieces together - e.g. a Payload
collection's schema _and_ the Mongo adapter _and_ the query layer - rather
than a single pure function. That's the difference from a unit test: there's
real I/O involved, so it needs a real (or real-like) database.

**Never point a test at the `DATABASE_URI` in `.env`.** That's a live,
shared MongoDB Atlas cluster - real app data. Every integration test here
uses [`mongodb-memory-server`](https://github.com/typegoose/mongodb-memory-server)
instead: it downloads and runs an actual MongoDB binary in an ephemeral,
isolated process per test run, so tests never need Docker and can never
touch shared infrastructure.

**Import-order gotcha:** `src/payload.config.ts` reads `process.env.DATABASE_URI`
(and `PAYLOAD_SECRET`) at _module import time_ - as an argument to
`mongooseAdapter({ url: process.env.DATABASE_URI })`, evaluated the instant
the config module loads, not lazily inside a function. That means a normal
top-level `import { getPayload } from "@/lib/payload"` would resolve before
`mongodb-memory-server` has even started, and Payload would try to connect
to `""`. The fix used throughout this folder:

```ts
let getPayload: typeof GetPayload;

beforeAll(async () => {
  const mongod = await MongoMemoryServer.create();
  process.env.DATABASE_URI = mongod.getUri();
  process.env.PAYLOAD_SECRET ||= "integration-test-secret";

  // dynamic import - runs *after* the env vars above are set, unlike a
  // static top-level import, which would be hoisted and run too early.
  ({ getPayload } = await import("@/lib/payload"));
});
```

Follow this same pattern for any new integration test that touches Payload:
set env vars in `beforeAll` first, then dynamically `import()` whatever
transitively pulls in `payload.config.ts`, and `mongod.stop()` in `afterAll`.

**First run downloads a MongoDB binary** (~75MB, cached afterwards under
`node_modules/.cache/mongodb-memory-server/`). Locally this is a one-time
cost. In CI, cache that directory (the same way `build-lint.yml` already
caches `.next/cache`) to avoid re-downloading it on every run - worth
picking up when CI is wired up for tests.

`beforeAll` in these tests passes an explicit longer timeout (`60_000`) to
`vitest` to cover that first download; don't remove it.
