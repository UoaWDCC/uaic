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

Create a `.env` file at the root directory with the following attributes:

```
# Payload and DB stuff
DATABASE_URI=
PAYLOAD_SECRET=


# S3
S3_BUCKET=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_REGION=
```

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

## Contributors - Team 2026

| Role            | Member          |
| --------------- | --------------- |
| Project Manager | Andre Camerino  |
| Technical Lead  | Evan Au         |
| Developer       | Nathan Dalpatan |
| Developer       | Stanley Wang   |

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
