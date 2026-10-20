// CloudFront distribution in front of the S3 bucket that Payload uploads to.
// Every environment shares the one bucket (each uploads into its own folder,
// see S3_ENV_FOLDER below), so this isn't an env var.
// No trailing slash. Setup: docs/media-cdn.md.
export const MEDIA_CDN_URL = "https://d3p01lx23boqdx.cloudfront.net";

const ENV_FOLDERS = ["prod", "qa", "dev"] as const;
type EnvFolder = (typeof ENV_FOLDERS)[number];

const isEnvFolder = (value: string): value is EnvFolder =>
  ENV_FOLDERS.some((folder) => folder === value);

// The folder this environment uploads into, e.g. "prod" -> prod/media/...
// Falls back to "dev" so a missing S3_PREFIX can never write into prod's
// folder. Anything else throws, so a typo can't start a stray folder.
// Lowercased because S3 keys are case-sensitive - "Prod" must not become a
// separate folder.
export const getS3EnvFolder = (value = process.env.S3_PREFIX): EnvFolder => {
  const folder = value?.trim().toLowerCase() || "dev";
  if (!isEnvFolder(folder)) {
    throw new Error(`S3_PREFIX must be one of ${ENV_FOLDERS.join(", ")} (got "${folder}")`);
  }
  return folder;
};

export const S3_ENV_FOLDER = getS3EnvFolder();

// `prefix` is the folder stored on the upload record. Records uploaded before
// the per-environment folders keep their old prefix (e.g. "media"), so build
// the URL from it rather than from this environment's folder.
export const mediaFileURL = ({ prefix, filename }: { prefix: string; filename: string }) =>
  [MEDIA_CDN_URL, ...prefix.split("/").filter(Boolean), filename]
    .map((part, i) => (i === 0 ? part : encodeURIComponent(part)))
    .join("/");
