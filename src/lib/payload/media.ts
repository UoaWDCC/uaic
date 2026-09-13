import type { Media } from "../../../payload-types";

// Payload's generated types don't encode query `depth`, so an upload/relation
// field is always typed as `string | Media` (or a nullable variant) even when
// you know it's populated. Narrow it to the populated Media doc, or
// `undefined` if it's still an unpopulated ID string / null / undefined.
export function resolveMedia(field: string | Media | null | undefined): Media | undefined {
  return field && typeof field === "object" ? field : undefined;
}
