# Accounts and access

Every external service the UAIC site depends on: who owns it, how to get in, and what the site uses it for. This is the handover reference for WDCC tech execs maintaining the site after the 2026 team.

**No secrets in this file.** It only says _where_ credentials are and who controls them (see [Where credentials live](#where-credentials-live)).

**The key account:** almost every service uses "Sign in with Google" with the shared account `uaic@projects.wdcc.co.nz`, so they have no passwords of their own. Whoever controls that account controls the site, so it's the first thing to hand over - see [The shared Google account](#the-shared-google-account).

> Last checked: 2026-10-19. Anything marked **TODO** still needs confirming. See the [checklist](#handover-checklist) at the bottom.

## Summary

| Service                                    | What the site uses it for            | Account / login                                                        | Plan                | Owner                                     | Access confirmed by 2 WDCC execs |
| ------------------------------------------ | ------------------------------------ | ---------------------------------------------------------------------- | ------------------- | ----------------------------------------- | -------------------------------- |
| [Vercel](#vercel)                          | Hosting - production + PR previews   | `uaic@projects.wdcc.co.nz` (Vercel user `uaic-1185`, team `uaic-wdcc`) | Hobby (free)        | WDCC (via the Google account)             | ☐                                |
| [MongoDB Atlas](#mongodb-atlas)            | Database (Payload CMS + Better Auth) | `uaic@projects.wdcc.co.nz`                                             | Free                | WDCC (via the Google account)             | ☐                                |
| [AWS S3 + CloudFront](#aws-s3--cloudfront) | Image uploads and serving            | Managed by WDCC execs - current team has no console access             | TODO                | WDCC execs (TODO: who)                    | ☐                                |
| [Stripe](#stripe)                          | Membership payments                  | `uaic@projects.wdcc.co.nz`                                             | Sandbox (test only) | WDCC (via the Google account)             | ☐                                |
| [Resend](#resend)                          | Transactional email                  | `uaic@projects.wdcc.co.nz`                                             | Free                | WDCC (via the Google account)             | ☐                                |
| [Google Cloud](#google-cloud-oauth-client) | "Sign in with Google" OAuth client   | `uaic@projects.wdcc.co.nz`                                             | Free                | WDCC (via the Google account)             | ☐                                |
| [Domain / DNS](#domain--dns)               | `uaic.wdcc.co.nz`                    | WDCC's registrar                                                       | -                   | WDCC                                      | ☐                                |
| [GitHub](#github)                          | Code, CI, issues                     | `UoaWDCC` org, repo `uaic`                                             | -                   | WDCC                                      | ☐                                |
| [Fly.io](#flyio-backup)                    | Backup host only                     | `uaic@projects.wdcc.co.nz`                                             | TODO                | WDCC (via the Google account)             | ☐                                |
| [Discord](#discord)                        | PR notifications (2026 only)         | WDCC Projects 2026 Discord server                                      | Free                | Project PM, tech lead and WDCC tech execs | ☐                                |

## Where credentials live

- **Logins:** there's no password manager. Every service except AWS uses "Sign in with Google" with `uaic@projects.wdcc.co.nz`, so the only password is the Google account's own (see below). AWS is handled by WDCC execs.
- **Runtime secrets:** Vercel project env vars (see [Vercel](#vercel)). Most are marked _Sensitive_ and **can't be read back** from Vercel - if a value is lost, it has to be regenerated at its source (Stripe, Resend, Google Cloud, Atlas) and set again. TODO: decide with WDCC whether to keep a copy of these values somewhere only WDCC can reach.
- **CI secrets:** GitHub repo -> Settings -> Secrets and variables -> Actions.
- **Local development:** each developer's own `.env` (gitignored). Copy `.env.example` and get the values from whoever maintains the site. Never commit `.env` or `.env.local`.

## The shared Google account

`uaic@projects.wdcc.co.nz` is how you sign in to Vercel, MongoDB Atlas, Stripe, Resend, Google Cloud and Fly.io - each uses "Sign in with Google", with no separate password. That makes it the single most important credential for the site.

- **Who can sign in:** the project's PM and tech lead, and WDCC tech execs
- **2-step verification:** TODO - confirm it's on, and that the second factor isn't one departing person's phone
- **Recovery email / phone:** TODO - should point at something WDCC controls, not a personal account
- **Who administers it:** it's on WDCC's `projects.wdcc.co.nz` Google Workspace domain, so WDCC's Workspace admins can reset it. TODO: confirm who they are.

When people leave, change this account's password and review its 2-step verification and recovery options. Changing the Google password doesn't sign out existing sessions in the other services, so also sign out other devices from the Google account's security settings.

## Services

### Vercel

- **Used for:** production hosting (`uaic.wdcc.co.nz`, also `uaic-uaic-wdcc.vercel.app`) and a preview deployment for every PR. Pushes to `main` deploy production.
- **Account:** Vercel user `uaic-1185` - sign in with Google as `uaic@projects.wdcc.co.nz`. It owns the `uaic-wdcc` team; the project is `uaic`.
- **Plan:** Hobby. Hobby accounts **can't have team members**, so access is by sharing the login, not by inviting people. Don't try to "invite" someone - they won't be able to join.
- **Env vars it holds:** `DATABASE_URI`, `PAYLOAD_SECRET`, `BETTER_AUTH_SECRET`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`, `RESEND_API_KEY`, `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`. As of 2026-10-19 they are all scoped to Production **and** Preview together, and `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `STRIPE_WEBHOOK_SECRET` and `BETTER_AUTH_URL` / `NEXT_PUBLIC_BETTER_AUTH_URL` are missing - see #494.
- **CLI access:** keep the shared login in its own config folder so it doesn't replace your personal Vercel login:

  ```bash
  vercel login --global-config ~/.vercel-uaic   # once
  vercel link --global-config ~/.vercel-uaic    # once per clone
  vercel env ls --global-config ~/.vercel-uaic
  ```

- **Watch out:** Vercel's Hobby plan is meant for non-commercial use, and its fair use guidelines list processing payments as commercial. The club decided to go ahead on Hobby; if Vercel ever pauses the deployment, this is the likely reason, and moving to Pro or to Fly (below) are the options.

### MongoDB Atlas

- **Used for:** the only database. Payload CMS (events, members, content) and Better Auth (users, sessions, accounts) both live in it - Better Auth's users _are_ Payload's `member` documents.
- **Where it is:** organization `UAIC's Org - 2025-04...` (full name is truncated in the Atlas header), project `Project 0` (Atlas's default name - rename it to `UAIC` in Project Settings; it doesn't affect connections), cluster `UAIC-WDCC` (`uaic-wdcc.4cqadha.mongodb.net`). Cluster names can't be changed after creation, which is fine.
- **Account:** Sign in with Google as `uaic@projects.wdcc.co.nz`. Only that account logs in to Atlas - developers never need Atlas access, just a connection string.
- **Plan / tier:** Free. One free cluster per project, 512MB storage; the app's data is ~1MB.
- **Network access:** IP access list is `0.0.0.0/0` (anywhere). Vercel's functions don't have fixed IPs, so this stays open - which means **database user passwords are the only thing protecting the data**.
- **Databases:** as of 2026-10-19, production, previews and local dev **all use the same `test` database**.
- **Database users:** as of 2026-10-19 there's a single user, `uaic`, with `readWriteAnyDatabase` on every database. Its password is in every developer's `.env` and in production, so anyone who has ever had a copy of that `.env` can read and write live data.
- **Planned setup (#492):** one project, one cluster, three databases, each with its own user that can only access that database:

  | Database    | User            | Used by                         |
  | ----------- | --------------- | ------------------------------- |
  | `uaic-prod` | `uaic-prod-app` | Vercel Production only          |
  | `uaic-qa`   | `uaic-qa-app`   | the `qa` branch only            |
  | `uaic-dev`  | `uaic-dev-app`  | PR previews and every developer |

  Once everything has switched over, `test` and the all-access `uaic` user are retired. Give developers the `uaic-dev-app` connection string only.

- **When to use a second project:** if prod ever needs paid backups or more storage on its own, move `uaic-prod` into its own project and cluster (`mongodump` / `mongorestore`, then change Production's `DATABASE_URI`).

### AWS S3 + CloudFront

- **Used for:** Payload image uploads (`media`, `investment-committee-images` collections) via `@payloadcms/storage-s3`. Files are served from CloudFront at `https://d3p01lx23boqdx.cloudfront.net` (`src/lib/mediaCdn.ts`).
- **Bucket:** one bucket shared by every environment. #493 adds a per-environment folder (`prod/`, `qa/`, `dev/`) so environments can't overwrite or delete each other's files.
- **Account / owner:** handled by **WDCC execs**, not the shared Google account. **The 2026 team does not have console access**; the app only uses the access keys in Vercel. TODO: which AWS account, and which WDCC execs can log in.
- **Watch out:** `src/lib/mediaCdn.ts` refers to a setup doc at `docs/media-cdn.md`, which doesn't exist. Whoever owns the AWS account should write down how the bucket and CloudFront distribution are set up.

### Stripe

- **Used for:** membership payments (`@stripe/react-stripe-js` PaymentElement + `src/app/api/create-payment-intent`). The webhook (`payment_intent.succeeded` -> `/api/webhooks/stripe`) is what saves a paid Member.
- **Mode:** **test keys everywhere** for now, including production. The account the keys belong to is a Stripe **sandbox named "UAIC sandbox"** (NZ), so it can't take real payments - switching to live keys is #497.
- **Account:** Sign in with Google as `uaic@projects.wdcc.co.nz`. For live payments the club may want its own Stripe account instead - the README's "Client Stripe Migration" section covers swapping it in (#497).
- **Webhooks:** as of 2026-10-19 **no webhook endpoints are registered** in the sandbox, so production can't confirm payments yet (#494 registers one). Check under **Developers -> Webhooks**. Local dev uses `stripe listen --forward-to localhost:3000/api/webhooks/stripe`, which prints a per-session secret.

### Resend

- **Used for:** transactional email (password reset, event/membership confirmations) via `src/features/email/lib/send-email.ts`.
- **Account:** Sign in with Google as `uaic@projects.wdcc.co.nz`.
- **Plan:** free - has daily/monthly sending limits, which the team has already been hitting.
- **Sender:** currently Resend's sandbox address `onboarding@resend.dev`, which **only delivers to the Resend account owner's own email**. Real recipients need a verified domain (#433) and a configurable sender (#434).
- **Env vars:** `RESEND_API_KEY`, `EMAIL_RECIPIENT` (dev test recipient).

### Google Cloud (OAuth client)

- **Used for:** "Sign in with Google" through Better Auth (`socialProviders.google` in `src/lib/auth.ts`).
- **Google Cloud project:** TODO - name/ID of the project holding the OAuth client (console.cloud.google.com -> project picker at the top).
- **Account:** Sign in with Google as `uaic@projects.wdcc.co.nz`, which can edit the OAuth client.
- **Authorised redirect URIs:** TODO - list them. Find them under **APIs & Services -> Credentials -> OAuth 2.0 Client IDs -> (the client)**; they look like `https://uaic.wdcc.co.nz/api/auth/callback/google`. Every environment URL that should allow Google sign-in (production, QA, `http://localhost:3000`) has to be added here exactly; wildcards aren't allowed, which is why PR previews can't use Google sign-in yet (#496).
- **Env vars:** `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.

### Domain / DNS

- **Used for:** `uaic.wdcc.co.nz`, pointing at Vercel.
- **Owner:** WDCC - the `wdcc.co.nz` domain and its registrar. DNS also serves other WDCC projects (e.g. Google Workspace MX records), so changes go through WDCC.
- **Contact:** TODO - who at WDCC to ask for DNS changes (e.g. Resend's DKIM/SPF records for #433).

### GitHub

- **Used for:** the repo (`UoaWDCC/uaic`), CI (`.github/workflows/ci.yml`), commit linting, PR notifications, issues and the project board.
- **Owner:** the `UoaWDCC` organization. Repo admins are WDCC tech members; TODO - confirm which current WDCC tech execs are admins.
- **Actions secrets:** `DISCORD_WEBHOOK_URL` (PR notifications), `FLY_API_TOKEN` (Fly deploys).
- **CI needs no real secrets** - the build job uses placeholder values and a local MongoDB.

### Fly.io (backup)

- **Used for:** the previous production host, now kept **only as a backup**. App name `uaic-prod`, config in `fly.toml`.
- **Account:** Sign in with Google as `uaic@projects.wdcc.co.nz`.
- **Watch out:** `.github/workflows/fly-deploy.yml` still deploys to Fly on every push to `main`, and its secrets probably point at the old shared database. #495 makes it manual-only.

### Discord

- **Used for:** posting PR notifications from `.github/workflows/notifications.yml`.
- **Account / owner:** a channel in the **WDCC Projects 2026** Discord server. The project's PM and tech lead, and WDCC tech execs, can manage the webhook.
- **Retiring it:** the channel is deprecated after 2026, so the webhook stops being useful. At that point delete `.github/workflows/notifications.yml` and the `DISCORD_WEBHOOK_URL` secret.
- **Secret:** `DISCORD_WEBHOOK_URL` in GitHub Actions secrets.

## Not used (yet)

- **PostHog** - planned for analytics (#282), not installed.
- **`@payloadcms/plugin-form-builder`** - never installed; event sign-up forms are custom.

## Handover checklist

Done when every box is ticked (tracked in #491):

- [ ] Every TODO above filled in
- [ ] `uaic@projects.wdcc.co.nz` has 2-step verification and recovery options that WDCC controls, and at least two WDCC tech execs can sign in to it
- [ ] WDCC execs confirm who can reach AWS
- [ ] At least two WDCC tech execs have logged in to each service (tick the last column of the summary table)
- [ ] Anything only one person can reach has a second owner, or has been moved somewhere WDCC controls
- [ ] Personal accounts of departing team members removed or downgraded where they had owner access
