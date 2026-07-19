# UAIC Project

Welcome to the UAIC Project!

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

Create a `.env` file at the root directory with the following attributes (see `.env.example` for a blank template):

```
# Payload and DB
DATABASE_URI=
PAYLOAD_SECRET=

# S3
S3_BUCKET=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_REGION=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Auth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
BETTER_AUTH_URL=

# Email
RESEND_API_KEY=
EMAIL_RECIPIENT=
```

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

## Linting & Formatting

```bash
pnpm lint          # check for ESLint issues
pnpm lint:fix      # auto-fix ESLint issues
pnpm format        # format all files with Prettier
pnpm format:check  # check formatting without writing


# Lint a single file
pnpm exec eslint path/to/your/file.tsx


# Format a single file with Prettier
pnpm exec prettier --write path/to/your/file.tsx


# Check formatting (without writing changes)
pnpm exec prettier --check path/to/your/file.tsx
```

Prettier (including Tailwind class sorting) and ESLint run automatically on staged files before every `git commit` via [Lefthook](https://lefthook.dev). The hooks are installed automatically when you run `pnpm install`. To skip in an emergency: `git commit --no-verify`.

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
