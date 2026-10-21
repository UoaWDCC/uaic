// Unit tier: pure functions, no S3. Guards the per-environment upload folder
// in payload.config.ts and the CloudFront URLs built from stored prefixes.
import { describe, it, expect } from "vitest";
import { MEDIA_CDN_URL, getS3EnvFolder, mediaFileURL } from "./mediaCdn";

describe("getS3EnvFolder", () => {
  it.each([
    ["prod", "prod"],
    ["qa", "qa"],
    ["dev", "dev"],
    [" prod ", "prod"],
    ["Prod", "prod"],
  ])("accepts %j as %j", (value, expected) => {
    expect(getS3EnvFolder(value)).toBe(expected);
  });

  it.each([undefined, "", "  "])("falls back to dev for %j, never prod", (value) => {
    expect(getS3EnvFolder(value)).toBe("dev");
  });

  it.each(["production", "prod/media", "../prod"])("rejects %j", (value) => {
    expect(() => getS3EnvFolder(value)).toThrow(/S3_PREFIX/);
  });
});

describe("mediaFileURL", () => {
  it("includes the environment folder for new uploads", () => {
    expect(mediaFileURL({ prefix: "prod/media", filename: "poster.png" })).toBe(
      `${MEDIA_CDN_URL}/prod/media/poster.png`,
    );
  });

  it("keeps the old folder for records uploaded before the split", () => {
    expect(mediaFileURL({ prefix: "media", filename: "poster.png" })).toBe(
      `${MEDIA_CDN_URL}/media/poster.png`,
    );
  });

  it("encodes the filename without encoding the folder slashes", () => {
    expect(mediaFileURL({ prefix: "dev/media/", filename: "my poster#1.png" })).toBe(
      `${MEDIA_CDN_URL}/dev/media/my%20poster%231.png`,
    );
  });
});
