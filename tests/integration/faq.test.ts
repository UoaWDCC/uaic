// Integration test - see tests/README.md for the DATABASE_URI import-order
// gotcha this beforeAll works around, and why mongodb-memory-server is used.
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import type { getPayload as GetPayload } from "@/lib/payload";

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

  it("creates, reads back, and deletes an FAQ", async () => {
    const payload = await getPayload();

    const created = await payload.create({
      collection: "FAQ",
      data: {
        question: "Does this example question require an example answer?",
        answer: "Yes, or else this test would fail.",
      },
    });

    const found = await payload.findByID({ collection: "FAQ", id: created.id });
    expect(found.question).toBe("Does this example question require an example answer?");
    expect(found.answer).toBe("Yes, or else this test would fail.");

    await payload.delete({ collection: "FAQ", id: created.id });
    await expect(payload.findByID({ collection: "FAQ", id: created.id })).rejects.toThrow();
  });
});
