import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getPayload } from "payload";
import RootLayout from "@/app/(home)/layout";

// Mock the CSS file so Vite/PostCSS skips transforming it
vi.mock("@/app/globals.css", () => ({ default: {} }));
vi.mock("./globals.css", () => ({ default: {} }));
vi.mock("../globals.css", () => ({ default: {} }));

// 1. Mock Payload CMS
vi.mock("payload", () => ({
  getPayload: vi.fn(),
}));

vi.mock("@payload-config", () => ({ default: {} }));

// 2. Mock Next.js Navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// 3. Mock Auth Client
vi.mock("@/lib/auth-client", () => ({
  useSession: () => ({ data: null }),
}));

// Type helper for the resolved getPayload client
type PayloadInstance = Awaited<ReturnType<typeof getPayload>>;

describe("RootLayout & StockTicker Wiring Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches ticker globals in RootLayout and passes them down to StockTicker", async () => {
    const mockSymbolsFromPayload = [
      { proName: "NASDAQ:NVDA", title: "Nvidia" },
      { proName: "BINANCE:ETHUSDT", title: "Ethereum" },
    ];

    const mockFindGlobal = vi.fn().mockResolvedValue({
      tickers: mockSymbolsFromPayload,
    });

    // Use vi.mocked instead of casting to `any`
    vi.mocked(getPayload).mockResolvedValue({
      findGlobal: mockFindGlobal,
    } as unknown as PayloadInstance);

    const LayoutJSX = await RootLayout({ children: <div id="test-child" /> }); //run the rootLayout function with mock data
    const { container } = render(LayoutJSX);

    expect(mockFindGlobal).toHaveBeenCalledWith({ slug: "ticker" }); //verify that the rootLayout requested the ticker global from Payload
    const scriptElements = container.querySelectorAll("script"); //find all TradingView widget <script> tags injected into the rendered DOM
    expect(scriptElements.length).toBeGreaterThan(0); //assert that at least one widget script tag was successfully rendered

    const scriptPayload = scriptElements[0].innerHTML;
    expect(scriptPayload).toContain("NASDAQ:NVDA");
    expect(scriptPayload).toContain("BINANCE:ETHUSDT");
  });

  it("triggers StockTicker default fallback when Payload returns an empty tickers array", async () => {
    const mockFindGlobal = vi.fn().mockResolvedValue({
      tickers: [],
    });

    vi.mocked(getPayload).mockResolvedValue({
      findGlobal: mockFindGlobal,
    } as unknown as PayloadInstance);

    const LayoutJSX = await RootLayout({ children: <div id="test-child" /> });
    const { container } = render(LayoutJSX);

    expect(mockFindGlobal).toHaveBeenCalledWith({ slug: "ticker" });

    const scriptElements = container.querySelectorAll("script");
    expect(scriptElements.length).toBeGreaterThan(0);

    const scriptPayload = scriptElements[0].innerHTML;
    expect(scriptPayload).toContain("FOREXCOM:SPXUSD");
  });
});
