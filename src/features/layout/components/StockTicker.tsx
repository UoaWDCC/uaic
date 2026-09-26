"use client";

import { useEffect, useRef } from "react";

export type TickerSymbol = {
  proName: string;
  title: string;
};

interface StockTickerProps {
  symbols?: TickerSymbol[];
  className?: string;
  isTransparent?: boolean;
}

function useTickerWidget(symbols: TickerSymbol[] = [], colorTheme: "light" | "dark") {
  const ref = useRef<HTMLDivElement>(null);
  const SYMBOLS = [
    { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
    { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
    { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
    { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
    { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
  ];

  const checkedSymbols = !symbols || symbols.length == 0 ? SYMBOLS : symbols; //if empty then use the local list

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: checkedSymbols, // <--- Pass activeSymbols here!
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "regular",
      colorTheme,
      locale: "en",
    });

    ref.current.innerHTML = "";
    ref.current.appendChild(script);
  }, [checkedSymbols, colorTheme, symbols]);

  return ref;
}

export default function StockTicker({
  symbols = [],
  className = "",
  isTransparent = false,
}: StockTickerProps) {
  const lightRef = useTickerWidget(symbols, "light");
  const darkRef = useTickerWidget(symbols, "dark");

  return (
    <div
      className={`tradingview-widget-container duration-base relative transition-colors ease-in-out ${
        isTransparent ? "bg-transparent" : "bg-white"
      } ${className}`}
    >
      <div
        className={`tradingview-widget-container__widget duration-base transition-opacity ease-in-out ${
          isTransparent ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        ref={lightRef}
      />

      <div
        className={`tradingview-widget-container__widget duration-base absolute inset-0 h-full w-full transition-opacity ease-in-out ${
          isTransparent ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        ref={darkRef}
      />
    </div>
  );
}
