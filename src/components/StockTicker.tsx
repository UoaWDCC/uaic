"use client";
import React, { useEffect, useRef } from "react";

interface StockTickerProps {
  className?: string;
  isTransparent?: boolean;
}

const SYMBOLS = [
  { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
  { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
  { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
  { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
  { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
];

function useTickerWidget(colorTheme: "light" | "dark") {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: SYMBOLS,
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "regular",
      colorTheme,
      locale: "en",
    });
    ref.current.innerHTML = "";
    ref.current.appendChild(script);
  }, [colorTheme]);

  return ref;
}

const StockTicker = ({ className = "", isTransparent = false }: StockTickerProps) => {
  const lightRef = useTickerWidget("light");
  const darkRef = useTickerWidget("dark");

  return (
    <div
      className={`tradingview-widget-container relative transition-colors duration-300 ease-in-out ${isTransparent ? "bg-transparent" : "bg-white"} ${className}`}
    >
      <div
        className={`tradingview-widget-container__widget transition-opacity duration-300 ease-in-out ${isTransparent ? "pointer-events-none opacity-0" : "opacity-100"}`}
        ref={lightRef}
      />
      <div
        className={`tradingview-widget-container__widget absolute inset-0 h-full w-full transition-opacity duration-300 ease-in-out ${isTransparent ? "opacity-100" : "pointer-events-none opacity-0"}`}
        ref={darkRef}
      />
    </div>
  );
};

export default StockTicker;
