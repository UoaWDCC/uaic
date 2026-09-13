# UAIC Project

The University of Auckland Investment Club (UAIC) is one of the largest Business School clubs at the University of Auckland, running investing competitions, events, and workshops for students of all backgrounds. This repo is the club's website: membership signup and payment, event registration with calendar invites, an executive committee directory, a club bulletin, and an admin panel for exec to manage all of it.

## Tech Stack

Next.js (App Router) + Payload CMS + Better Auth + Stripe + MongoDB.

## Commands

```bash
pnpm install                          # install dependencies
pnpm dev                              # start the dev server (Turbopack)
pnpm build                            # production build
pnpm start                            # start the production server (after build)

pnpm lint                             # check for ESLint issues
pnpm lint:fix                         # auto-fix ESLint issues
pnpm format                           # format all files with Prettier
pnpm format:check                     # check formatting without writing

pnpm test                             # run the test suite once
pnpm test:watch                       # re-run tests on file changes

pnpm generate:types                   # regenerate payload-types.ts after changing a Payload collection
pnpm delete-test-account -- <email>   # delete a test account from the shared dev database (see below)
```

# Getting Started

Ensure you have `Node` installed. Installation can be found [here](https://nodejs.org/en/download).

Ensure you have `pnpm` installed. An installation guide can be found [here](https://pnpm.io/installation).

> It is recommended that you install `pnpm` using `npm`
> Run the following command in your terminal to install `pnpm` using `npm` is:
>
> `npm install -g pnpm@latest-10`

Ensure `git` is also installed and run the following command at your desired folder:

```bash
git clone https://github.com/UoaWDCC/uaic
```

Navigate to the project root and install dependencies:

```bash
pnpm install
```

Copy `.env.example` to `.env` at the root directory and fill in the values:

```bash
cp .env.example .env
```

`DATABASE_URI` points at a shared MongoDB Atlas cluster used by everyone's
local dev — not a per-developer database. Use `pnpm delete-test-account -- <email>`
to clean up test accounts you create while testing signup/login rather than
deleting things by hand.

### Stripe webhook (local dev only)

`STRIPE_WEBHOOK_SECRET` must come from the Stripe CLI, not the dashboard, when running locally:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the printed `whsec_...` value into your `.env.local` as `STRIPE_WEBHOOK_SECRET`. This secret changes every session — it is only for local development.

Finally, run the project:

```
pnpm dev
```

## Project Structure

```
src/
  app/          Next.js App Router routes - pages, layouts, API routes
  features/     domain/feature-scoped code (components, data fetchers) - see src/features/README.md
  components/   shared UI used across multiple features - see src/components/README.md
  collections/  Payload CMS collection schemas
  lib/          cross-cutting infra (auth, Payload client, shared utils)
  payload.config.ts
```

If you're adding a new component or data fetcher, `src/features/README.md`
and `src/components/README.md` cover where it should go.

## Admin Panel

The Payload admin panel is at `/admin` (e.g. `http://localhost:3000/admin`
locally). With no users in the `users` collection yet, Payload shows a
"create first user" form on first visit — that becomes your admin login.

Admin-panel access (the `users` collection) is separate from club
membership (the `Member` collection) — creating an admin user here does not
make someone a member, and vice versa. See `CLAUDE.md`'s Architecture Notes
for the full distinction.

## Linting & Formatting

See the Commands cheat sheet above for `pnpm lint`/`format`. To target a single file:

```bash
pnpm exec eslint path/to/your/file.tsx      # lint a single file
pnpm exec prettier --write path/to/your/file.tsx   # format a single file
pnpm exec prettier --check path/to/your/file.tsx   # check formatting without writing
```

## Git Hooks

This project uses [Lefthook](https://lefthook.dev) for git hooks, installed automatically when you run `pnpm install`. To skip any hook in an emergency: `git commit --no-verify` (or `--no-verify` on the relevant git command).

- **pre-commit** — Prettier (including Tailwind class sorting) and ESLint run automatically on staged files.
- **commit-msg** — commit messages must follow `type(dir): description`, e.g. `fix(events): correct upcoming/past toggle filter`, enforced via [commitlint](https://commitlint.js.org) (see `commitlint.config.js`). Valid types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`. Type is case-insensitive; scope is optional (some commits legitimately span multiple files/dirs). Also checked in CI on pull requests via `.github/workflows/commitlint.yml` (currently non-blocking — no branch protection requires it yet).
- **post-merge** / **post-checkout** — `pnpm install` runs automatically after `git pull` or switching branches, but only when `package.json` or `pnpm-lock.yaml` actually changed.

## Testing

Tests run with [Vitest](https://vitest.dev) and [React Testing Library](https://testing-library.com/react) — see the Commands cheat sheet above for `pnpm test`/`test:watch`. Colocate a test next to the code it covers as `*.test.ts(x)`, or add it under `tests/` for cross-cutting/setup checks.

## Client Stripe Migration

When a client migrates to this platform using their own Stripe account, the following env vars need to be swapped to their values:

| Variable                        | Where to find it                                           |
| ------------------------------- | ---------------------------------------------------------- |
| `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` | Stripe Dashboard → Developers → API keys → Publishable key |
| `STRIPE_SECRET_KEY`             | Stripe Dashboard → Developers → API keys → Secret key      |
| `STRIPE_WEBHOOK_SECRET`         | Stripe Dashboard → Developers → Webhooks → (see below)     |

**Registering the webhook endpoint**

The client must register the webhook endpoint in their own Stripe Dashboard before `STRIPE_WEBHOOK_SECRET` is available:

1. Go to **Stripe Dashboard → Developers → Webhooks → Add endpoint**
2. Set the URL to `https://<their-domain>/api/webhooks/stripe`
3. Select the `payment_intent.succeeded` event
4. After saving, click **Reveal** under "Signing secret"
5. Add that `whsec_...` value as `STRIPE_WEBHOOK_SECRET` in the production environment

No code changes are needed — the app reads these values from environment variables.

## Contributors - Team 2026

| Role            | Member          |
| --------------- | --------------- |
| Project Manager | Andre Camerino  |
| Technical Lead  | Evan Au         |
| Developer       | Nathan Dalpatan |
| Developer       | Stanley Wang    |
| Dev / Designer  | Aeryn Lao       |
| Developer       | Sahil Kirpalani |
| Developer       | Mary Marikit    |
| Developer       | Luca Devoti     |
| Developer       | Kelvin Mensah   |
| Designer        | Kade Fry        |

## Contributors - Team 2025

| Role                 | Member                  |
| -------------------- | ----------------------- |
| Project Manager      | Ezekiel Ko              |
| Technical Lead       | Jerry Nguyen            |
| Designer / Developer | Andre Camerino          |
| Designer / Developer | Angelica Huang          |
| Developer            | Evan Au                 |
| Developer            | Nicholas Garcia-Scholtz |
| Developer            | Paige Phan              |
| Developer            | Sam Richell-Smith       |
| Developer            | Nathan Turley           |
| Developer            | Jesse Wanghan           |
