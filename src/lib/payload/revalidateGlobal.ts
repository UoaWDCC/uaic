import { revalidatePath } from "next/cache";
import type { GlobalAfterChangeHook } from "payload";

/** Invalidate shared CMS data after a global save. Call from a Next.js request context. */
export const revalidateGlobal = (path: string, type: "page" | "layout" = "layout") => {
  const afterChange: GlobalAfterChangeHook = ({ doc }) => {
    revalidatePath(path, type);
    return doc;
  };

  return { afterChange: [afterChange] };
};
