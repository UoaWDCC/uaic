// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";
import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidateOnChange } from "./revalidateOnChange";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

type Doc = { id: string; slug: string };
type ChangeArgs = Parameters<CollectionAfterChangeHook<Doc>>[0];
type DeleteArgs = Parameters<CollectionAfterDeleteHook<Doc>>[0];

const doc: Doc = { id: "event-1", slug: "current-event" };

// These hooks only read document and operation fields; no Payload request is needed.
const changeArgs = (overrides: Partial<ChangeArgs> = {}): ChangeArgs =>
  ({ doc, operation: "create", ...overrides }) as ChangeArgs;
const deleteArgs = { doc } as DeleteArgs;

describe("revalidateOnChange", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    // Case 1: A single string path calls revalidatePath exactly once on create.
    { label: "a single path", paths: "/events", expected: [["/events"]] },
    // Case 2: An array of paths calls revalidatePath once per path on create.
    { label: "an array of paths", paths: ["/", "/events"], expected: [["/"], ["/events"]] },
    // Case 4: Duplicate array entries are deduplicated by the Set on create.
    {
      label: "duplicate paths",
      paths: ["/", "/events", "/", "/events"],
      expected: [["/"], ["/events"]],
    },
  ])("revalidates each unique path on create with $label", async ({ paths, expected }) => {
    const { afterChange } = revalidateOnChange<Doc>(paths);

    const result = await afterChange[0](changeArgs());

    expect(vi.mocked(revalidatePath).mock.calls).toEqual(expected);
    expect(result).toBe(doc);
  });

  // Case 3: Delete revalidates the same single/array paths through afterDelete alone.
  it.each([
    { label: "a single path", paths: "/events", expected: [["/events"]] },
    { label: "an array of paths", paths: ["/", "/events"], expected: [["/"], ["/events"]] },
    // Case 4: The Set also deduplicates duplicate array entries on delete.
    {
      label: "duplicate paths",
      paths: ["/", "/events", "/", "/events"],
      expected: [["/"], ["/events"]],
    },
  ])("revalidates each unique path on delete with $label", async ({ paths, expected }) => {
    const { afterDelete } = revalidateOnChange<Doc>(paths);

    // Invoke afterDelete alone to verify it does not depend on afterChange running.
    const result = await afterDelete[0](deleteArgs);

    expect(vi.mocked(revalidatePath).mock.calls).toEqual(expected);
    expect(result).toBe(doc);
  });

  // Case 4: A path shared by the current and previous doc is deduplicated on update.
  it("revalidates a path shared by the current and previous document only once", async () => {
    const { afterChange } = revalidateOnChange<Doc>((event) => `/events/${event.slug}`);

    await afterChange[0](changeArgs({ operation: "update", previousDoc: { ...doc } }));

    expect(vi.mocked(revalidatePath).mock.calls).toEqual([["/events/current-event"]]);
  });
});
