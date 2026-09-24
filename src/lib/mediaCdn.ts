// CloudFront distribution in front of the S3 bucket that Payload uploads to.
// Every environment shares the one bucket, so this isn't an env var.
// No trailing slash. Setup: docs/media-cdn.md.
export const MEDIA_CDN_URL = "https://d3p01lx23boqdx.cloudfront.net";
