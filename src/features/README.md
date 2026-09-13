# Features

Each subfolder here is a self-contained slice of the app: a domain
(`bulletins`, `events`, `investments`, `joinus`, `payment`, `membership`,
`faq`) or a cohesive cross-cutting concern that isn't tied to any one page
(`layout`, `email`, `admin`, `auth`). If something is only ever used by one
feature, it belongs inside that feature's folder - not in the top-level
`src/components/` or `src/lib/`. See `../components/README.md` for the rule
on what qualifies as genuinely shared instead.

## Shape

```
features/<name>/
  components/   UI for this feature
  data/         Payload fetchers ("use server" functions that call getPayload())
  lib/          non-fetcher utilities specific to this feature (rare - see below)
```

Not every feature has all three - most only have `components/`, some add
`data/` once they need to fetch from a Payload collection.

`lib/` is the odd one out and only exists in `features/email/` so far
(`send-email.ts`, `generateICS.ts`, `generateGoogleCalendar.ts`,
`formatDate.ts`). Reach for it only when a feature has real non-fetcher
logic that doesn't belong in `data/` - don't add it preemptively.

## Where a data fetcher goes

Put a Payload fetcher (`getX.ts`) in the feature whose UI actually calls it,
not in the feature whose _collection_ it queries, and not in a generic
grab-bag. `features/users/data/` used to hold `getEvents`, `getFAQs`,
`getICGroupPhoto`, and `getLandingPageImage` - none of which had anything to
do with "users" - because it was easier to dump new fetchers there than
decide where they belonged. Each got moved to the feature that actually
calls it (`events`, `faq`, `investments`, `bulletins`), and the dead
`getUsers.ts` (zero remaining callers once `src/app/(home)/test/` was
deleted) was removed outright rather than moved. If you're about to add a
fetcher and no existing feature obviously owns it, that's a sign to create a
new feature folder (see `layout` and `email` for precedent - neither is a
classic "business domain," but each groups a cohesive set of files that
belong together) rather than reach for the nearest unrelated one.

## A collection doesn't import from here

`src/collections/*.ts` (Payload schema) can be imported _by_ a feature, but
never the other way around - a collection depending on feature-owned code
would invert the dependency direction. That's why something like
`src/lib/bulletinCategories.ts`, used by both `collections/Bulletins.ts` and
`features/bulletins/data/getBulletins.ts`, lives in the shared `src/lib/`
instead of inside `features/bulletins/` - it has to be reachable from the
collection layer, which sits below features, not inside one.
