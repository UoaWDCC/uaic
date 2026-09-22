import { Ticker } from "@/collections/Ticker";
import { describe, it, expect } from "vitest";
// This test ensures the Global ticker contains the specified fields.

describe("Ticker Global Configuration", () => {
  it("should have correct slug and required fields for tickers", () => {
    expect(Ticker.slug).toBe("ticker");

    // Locate the 'tickers' array field
    const tickersArrayField = Ticker.fields.find(
      (field: any) => field.name === "tickers" && field.type === "array",
    ) as any;

    expect(tickersArrayField).toBeDefined();

    // Find proName and title sub-fields inside the array
    const proNameField = tickersArrayField.fields.find((f: any) => f.name === "proName");
    const titleField = tickersArrayField.fields.find((f: any) => f.name === "title");

    // Check required field validation
    expect(proNameField).toBeDefined();
    expect(proNameField.required).toBe(true);

    expect(titleField).toBeDefined();
    expect(titleField.required).toBe(true);
  });
});
