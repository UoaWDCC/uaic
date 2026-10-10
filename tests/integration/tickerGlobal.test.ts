import { Ticker } from "@/collections/Ticker";
import { describe, it, expect, vi } from "vitest";
import { revalidatePath } from "next/cache";
import type { ArrayField, Field, GlobalAfterChangeHook } from "payload";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

// Helper type for fields that have a name and optional required property
type NamedField = Extract<Field, { name: string }> & { required?: boolean };

describe("Ticker Global Configuration", () => {
  it("invalidates the shared layout after a save and preserves the document", async () => {
    vi.mocked(revalidatePath).mockClear();
    const doc = { tickers: [{ proName: "NASDAQ:AAPL", title: "Apple" }] };
    const args = { doc } as Parameters<GlobalAfterChangeHook>[0];
    const afterChange = Ticker.hooks?.afterChange?.[0];

    expect(afterChange).toBeDefined();
    expect(await afterChange!(args)).toBe(doc);
    expect(vi.mocked(revalidatePath).mock.calls).toEqual([["/", "layout"]]);
    expect(Ticker.hooks).not.toHaveProperty("afterDelete");
  });

  it("should have correct slug and required fields for tickers", () => {
    expect(Ticker.slug).toBe("ticker");

    // Type guard narrows `field` to Payload's ArrayField
    const tickersArrayField = Ticker.fields.find(
      (field): field is ArrayField =>
        "name" in field && field.name === "tickers" && field.type === "array",
    );

    expect(tickersArrayField).toBeDefined();

    // Cast subfields to NamedField to safely access .name and .required
    const subFields = (tickersArrayField?.fields ?? []) as NamedField[];

    const proNameField = subFields.find((f) => f.name === "proName");
    const titleField = subFields.find((f) => f.name === "title");

    expect(proNameField).toBeDefined();
    expect(proNameField?.required).toBe(true);

    expect(titleField).toBeDefined();
    expect(titleField?.required).toBe(true);
  });
});
