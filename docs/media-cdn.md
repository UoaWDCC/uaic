# Media storage and CDN

Images uploaded in the admin panel (`media` and `investment-committee-images`)
are stored in one S3 bucket shared by every environment, and served straight
from a CloudFront distribution in front of it (`MEDIA_CDN_URL` in
`src/lib/mediaCdn.ts`). The bucket and distribution live in WDCC's AWS account,
so changes to them go through the WDCC execs.

Serving from CloudFront skips Payload's `/api/<collection>/file` route, which
also skips Payload's `access.read`. Only use `cdnCollection` in
`src/payload.config.ts` for collections anyone can read.

## One folder per environment

Each environment uploads into its own folder of the bucket, set by `S3_PREFIX`:

| Environment        | `S3_PREFIX` | Database  | Uploads go to    |
| ------------------ | ----------- | --------- | ---------------- |
| Production         | `prod`      | uaic-prod | `prod/media/...` |
| QA (`qa` branch)   | `qa`        | uaic-qa   | `qa/media/...`   |
| PR previews, local | `dev`       | uaic-dev  | `dev/media/...`  |

The databases are separate, so without the folders two environments could
upload the same filename over each other's file, and deleting an image in dev
could delete the file a prod record still points at.

A missing `S3_PREFIX` falls back to `dev`, never `prod`. Anything other than
`prod`, `qa` or `dev` stops the app from starting.

## Stored prefixes

The storage plugin saves each upload's folder on its record (`prefix`, e.g.
`prod/media`) and uses it for the file's URL and for deleting it. Changing
`S3_PREFIX` only affects new uploads - existing records keep pointing wherever
they were uploaded to, so records from before the folders existed still say
`media` and still load.

## Moving records into their environment's folder

`pnpm move-media-to-env` points a database's records at copies in that
database's own folder. Run it:

- once per database for records uploaded before the folders existed (done for
  uaic-prod and uaic-dev)
- on uaic-qa after copying content from prod (`pnpm copy-database`, added in
  #492), since the copied records still point at prod's files

Run it before anyone edits images in that database's admin panel. Replacing
the file on a record that still points at another folder deletes the original
object, which another environment may still be using.

```bash
pnpm move-media-to-env -- --dry-run   # see what would move
pnpm move-media-to-env                # copy the objects and update the records
```

It works on the database in `DATABASE_URI`, and picks the folder from the
database name (uaic-prod -> `prod/`). To run it against prod or QA, put a
connection string for that database in `DATABASE_URI` for the one command -
a short-lived Atlas user is easiest. It copies objects rather than moving them,
because another database's records may still use the old file, and it's safe to
re-run.

The original top-level `media/` and `investment-committee-images/` folders are
no longer used by uaic-prod or uaic-dev. They're left in place rather than
deleted, so nothing breaks if an old record turns up.
