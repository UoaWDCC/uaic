import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, TypeWithID } from "payload";

/** Invalidate a public page after a CMS write. Call from a Next.js request context. */
export const revalidateOnChange = <T extends TypeWithID = TypeWithID>(
  path: string | string[] | ((doc: T) => string),
) => {
  const getPaths = (doc: T): string[] => {
    const resolved = typeof path === "function" ? path(doc) : path;
    return typeof resolved === "string" ? [resolved] : resolved;
  };

  const afterChange: CollectionAfterChangeHook<T> = ({ doc, previousDoc, operation }) => {
    const paths = new Set(getPaths(doc));

    // A renamed slug must invalidate the old URL as well as the new one.
    if (typeof path === "function" && operation === "update" && previousDoc) {
      getPaths(previousDoc).forEach((pagePath) => paths.add(pagePath));
    }

    paths.forEach((pagePath) => revalidatePath(pagePath));
    return doc;
  };

  const afterDelete: CollectionAfterDeleteHook<T> = ({ doc }) => {
    new Set(getPaths(doc)).forEach((pagePath) => revalidatePath(pagePath));
    return doc;
  };

  return { afterChange: [afterChange], afterDelete: [afterDelete] };
};
