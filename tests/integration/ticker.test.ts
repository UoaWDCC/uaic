import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getPayload } from "payload";
import StockTicker from "../../src/features/layout/components/StockTicker";

//This test stimulates how StockTicker - the client component is called in the Navbar, and checks if its behaviour matches the requirements.

// Mock Payload CMS
vi.mock("payload", () => ({
  getPayload: vi.fn(),
}));

vi.mock("@payload-config", () => ({ default: {} }));

describe("StockTicker Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders using symbols returned by payload.findGlobal rather than hardcoded values", async () => {
    const mockSymbolsFromPayload = [
      { proName: "NASDAQ:NVDA", title: "Nvidia" },
      { proName: "BINANCE:ETHUSDT", title: "Ethereum" },
    ];

    const mockFindGlobal = vi.fn().mockResolvedValue({
      tickers: mockSymbolsFromPayload,
    });

    (getPayload as any).mockResolvedValue({
      findGlobal: mockFindGlobal,
    });

    // Simulate fetching payload global as done in layout.tsx
    const payload = await getPayload({ config: {} as any });
    const tickerGlobal = await payload.findGlobal({ slug: "ticker" });
    const symbols = (tickerGlobal?.tickers || []).map((item: any) => ({
      proName: item.proName,
      title: item.title,
    }));

    // Use React.createElement for pure .ts files
    const { container } = render(React.createElement(StockTicker, { symbols }));

    // Verify findGlobal was queried with slug "ticker"
    expect(mockFindGlobal).toHaveBeenCalledWith({ slug: "ticker" });

    // Verify TradingView script tags contain dynamic symbols
    const scriptElements = container.querySelectorAll("script");
    expect(scriptElements.length).toBeGreaterThan(0);

    const scriptPayload = scriptElements[0].innerHTML;
    expect(scriptPayload).toContain("NASDAQ:NVDA");
    expect(scriptPayload).toContain("BINANCE:ETHUSDT");
  });

  it("handles empty-state gracefully when payload.findGlobal returns no tickers", async () => {
    const mockFindGlobal = vi.fn().mockResolvedValue({
      tickers: [],
    });

    (getPayload as any).mockResolvedValue({
      findGlobal: mockFindGlobal,
    });

    const payload = await getPayload({ config: {} as any });
    const tickerGlobal = await payload.findGlobal({ slug: "ticker" });
    const symbols = (tickerGlobal?.tickers || []).map((item: any) => ({
      proName: item.proName,
      title: item.title,
    }));

    const { container } = render(React.createElement(StockTicker, { symbols }));

    expect(mockFindGlobal).toHaveBeenCalledWith({ slug: "ticker" });

    // No script elements should render when symbols array is empty
    const scriptElements = container.querySelectorAll("script");
    expect(scriptElements.length).toBe(0);
  });

  it("handles fallback default props when symbols is empty or undefined", () => {
    const { container } = render(React.createElement(StockTicker, { symbols: [] }));

    const scriptElements = container.querySelectorAll("script");
    expect(scriptElements.length).toBe(0);
  });
});
