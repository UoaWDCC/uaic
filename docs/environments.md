# Environments and env vars

The site runs on Vercel (team `uaic-wdcc`, project `uaic`). Each environment has
its own database, S3 folder and secrets:

| Environment | Where                                 | Database  | `S3_PREFIX` |
| ----------- | ------------------------------------- | --------- | ----------- |
| Production  | `uaic.wdcc.co.nz` (Vercel Production) | uaic-prod | `prod`      |
| QA          | `qa` branch (#487)                    | uaic-qa   | `qa`        |
| PR previews | Vercel Preview                        | uaic-dev  | `dev`       |
| Local       | your `.env`                           | uaic-dev  | `dev`       |

Use the UAIC Vercel login for changes, e.g.
`vercel --global-config ~/.vercel-uaic env add <NAME> production`.
`NEXT_PUBLIC_*` values are baked in at build time, so redeploy after changing
one.

## Where each value comes from

Most values are marked Sensitive on Vercel and can't be read back. There's no
password manager - if a value is lost, get or regenerate it at its source and
set it again. Every source below is reached with "Sign in with Google" as
`uaic@projects.wdcc.co.nz` (see `docs/handover/accounts.md`), except AWS.

| Variable                                                             | Production                        | Preview / local                                          | Source                                                                                               |
| -------------------------------------------------------------------- | --------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `DATABASE_URI`                                                       | `uaic-prod-app` -> uaic-prod      | `uaic-dev-app` -> uaic-dev                               | MongoDB Atlas, project `UAIC`. Lost? Reset the login's password (`atlas dbusers update`).            |
| `PAYLOAD_SECRET`, `BETTER_AUTH_SECRET`                               | own values                        | shared dev values                                        | Random. Regenerate with `openssl rand -base64 48` - prod's logs everyone out (admin and members).    |
| `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | same everywhere                   | same everywhere                                          | WDCC's AWS account - ask the WDCC execs.                                                             |
| `S3_PREFIX`                                                          | `prod`                            | `dev`                                                    | Fixed values - see `docs/media-cdn.md`.                                                              |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`                           | same client                       | same client                                              | Google Cloud project `uaic` (`uaic-be7bb`) -> APIs & Services -> Credentials -> OAuth client "UAIC". |
| `BETTER_AUTH_URL`, `NEXT_PUBLIC_BETTER_AUTH_URL`                     | `https://uaic.wdcc.co.nz`         | unset (uses the request's URL) / `http://localhost:3000` | -                                                                                                    |
| `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`, `STRIPE_SECRET_KEY`                 | sandbox test keys (#497 for live) | sandbox test keys                                        | Stripe "UAIC sandbox" -> Developers -> API keys.                                                     |
| `STRIPE_WEBHOOK_SECRET`                                              | from the prod webhook endpoint    | unset / `stripe listen`                                  | Stripe -> Developers -> Webhooks -> `https://uaic.wdcc.co.nz/api/webhooks/stripe` -> Signing secret. |
| `RESEND_API_KEY`                                                     | shared key                        | shared key                                               | Resend -> API Keys. Per-environment sending is #433 / #437.                                          |
| `NEXT_PUBLIC_ONSITE_REGISTRATION`                                    | unset (off)                       | `true`                                                   | Fixed values - read by the code once #473 lands.                                                     |

Local-only: `EMAIL_RECIPIENT` (default recipient for the test email script) and
`TEST_MEMBER_EMAIL` / `TEST_MEMBER_PASSWORD` (written by `pnpm seed-test-member`).

## Third-party settings tied to a URL

Adding an environment with its own URL (e.g. QA in #487) also needs:

- **Google OAuth client:** the environment's
  `https://<host>/api/auth/callback/google` under **Authorised redirect URIs**
  (not JavaScript origins). Currently: production and `http://localhost:3000`.
- **Stripe:** a webhook endpoint for `https://<host>/api/webhooks/stripe`
  listening for `payment_intent.succeeded`, and its signing secret as that
  environment's `STRIPE_WEBHOOK_SECRET`.
