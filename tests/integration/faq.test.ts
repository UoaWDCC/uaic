// Integration test - see tests/README.md for the DATABASE_URI import-order
// gotcha this beforeAll works around, and why mongodb-memory-server is used.
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { revalidatePath } from "next/cache";
import { MongoMemoryServer } from "mongodb-memory-server";
import type { getPayload as GetPayload } from "@/lib/payload";

// Payload runs against real MongoDB here, but Vitest has no Next.js request/cache
// context. Assert invalidation requests without invoking Next.js's runtime cache.
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

describe("FAQ collection (Payload + Mongo round-trip)", () => {
  let mongod: MongoMemoryServer;
  let getPayload: typeof GetPayload;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    process.env.DATABASE_URI = mongod.getUri();
    process.env.PAYLOAD_SECRET ||= "integration-test-secret";

    ({ getPayload } = await import("@/lib/payload"));
  }, 60_000);

  afterAll(async () => {
    await mongod.stop();
  });

  it("creates, updates, reads back, and deletes an FAQ, invalidating its page", async () => {
    const payload = await getPayload();
    vi.mocked(revalidatePath).mockClear();

    const created = await payload.create({
      collection: "FAQ",
      data: {
        question: "Does this example question require an example answer?",
        answer: "Yes, or else this test would fail.",
      },
    });
    expect(revalidatePath).toHaveBeenCalledExactlyOnceWith("/FAQ");

    const found = await payload.findByID({ collection: "FAQ", id: created.id });
    expect(found.question).toBe("Does this example question require an example answer?");
    expect(found.answer).toBe("Yes, or else this test would fail.");

    vi.mocked(revalidatePath).mockClear();
    await payload.update({
      collection: "FAQ",
      id: created.id,
      data: { answer: "Updated example answer." },
    });
    const updated = await payload.findByID({ collection: "FAQ", id: created.id });
    expect(updated.answer).toBe("Updated example answer.");
    expect(revalidatePath).toHaveBeenCalledExactlyOnceWith("/FAQ");

    vi.mocked(revalidatePath).mockClear();
    await payload.delete({ collection: "FAQ", id: created.id });
    expect(revalidatePath).toHaveBeenCalledExactlyOnceWith("/FAQ");
    await expect(payload.findByID({ collection: "FAQ", id: created.id })).rejects.toThrow();
  });
});
