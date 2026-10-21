# Fly.io backup

Production runs on Vercel. The Fly.io app `uaic-prod` (config in `fly.toml`,
image built from `Dockerfile`) is a **cold backup**: it has working secrets but
no running machines, so it costs nothing and serves nothing until someone
starts it. It's there in case Vercel becomes unusable for the site - for
example if the Hobby plan gets paused (see `docs/handover/accounts.md`).

Sign in to Fly with Google as `uaic@projects.wdcc.co.nz` (the
`projects-uaic` organisation), or `flyctl auth login` for the CLI.

## What Fly has

Fly keeps its own copies of production's settings, as Fly secrets:

| Secret                                       | Value                                                               |
| -------------------------------------------- | ------------------------------------------------------------------- |
| `DATABASE_URI`                               | uaic-prod, through its own Atlas login `uaic-fly-app`               |
| `PAYLOAD_SECRET`, `BETTER_AUTH_SECRET`       | Fly's own - after a failover, admins and members sign in again      |
| `BETTER_AUTH_URL`                            | `https://uaic.wdcc.co.nz`                                           |
| `S3_*`, `S3_PREFIX=prod`                     | Same bucket and folder as production                                |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`   | Same OAuth client as production                                     |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Same as production - Stripe sends to the domain, wherever it points |
| `RESEND_API_KEY`                             | Same as production                                                  |

`NEXT_PUBLIC_*` values are baked in at build time, so they live in `fly.toml`
under `[build.args]` rather than in secrets.

**Keep them in sync.** When a production value changes on Vercel (e.g. live
Stripe keys in #497, a rotated Google secret), set it on Fly too, without
redeploying:

```bash
flyctl secrets set NAME=value --stage -a uaic-prod
```

`flyctl secrets list -a uaic-prod` shows the names (never the values). They show as
"Staged" until the next deploy - that's expected for a cold backup, and the
failover deploy below applies them.

## Failing over to Fly

1. Check Fly's secrets and `fly.toml` still match production (above).
2. Deploy the current `main`: GitHub -> Actions -> **Fly Deploy** -> Run
   workflow. It only ever runs by hand.
3. Start a machine: `flyctl scale count 1 -a uaic-prod`, then check
   `https://uaic-prod.fly.dev` loads. Google sign-in won't work on that URL -
   it only works on the real domain.
4. Add the domain on Fly: `flyctl certs add uaic.wdcc.co.nz -a uaic-prod`. It
   prints the DNS records Fly needs.
5. Ask WDCC (who manage the `wdcc.co.nz` DNS) to point `uaic.wdcc.co.nz` at
   Fly using those records. Once DNS updates, Google sign-in and the Stripe
   webhook work unchanged, since both use the domain.

## Switching back to Vercel

1. Ask WDCC to point `uaic.wdcc.co.nz` back at Vercel (the records Vercel shows
   under the project's **Settings -> Domains**).
2. Once traffic is back on Vercel, stop Fly: `flyctl scale count 0 -a uaic-prod`.

## Retiring it

WDCC decides when Fly is no longer needed - as a guide, once production has
run on Vercel for a full semester without needing it. To retire it:

- `flyctl apps destroy uaic-prod`
- delete `fly.toml`, `.github/workflows/fly-deploy.yml`, this file, and the
  `FLY_API_TOKEN` GitHub Actions secret
- delete the `uaic-fly-app` Atlas database user
