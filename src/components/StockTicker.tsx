"use client";
import React, { useEffect, useRef } from "react";

interface StockTickerProps {
  className?: string;
  isTransparent?: boolean;
}

const StockTicker = ({ className = "", isTransparent = false }: StockTickerProps) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetRef.current) return;
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
        { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
      ],
      showSymbolLogo: true,
      // Widget itself is always transparent; the wrapper below controls the
      // visible background via CSS so toggling it never re-injects the script.
      isTransparent: true,
      displayMode: "regular",
      colorTheme: "light",
      locale: "en",
    });
    widgetRef.current.innerHTML = "";
    widgetRef.current.appendChild(script);
  }, []);

  return (
    <div
      className={`tradingview-widget-container transition-colors duration-300 ease-in-out ${isTransparent ? "bg-transparent" : "bg-white"} ${className}`}
    >
      <div className="tradingview-widget-container__widget" ref={widgetRef}></div>
    </div>
  );
};

export default StockTicker;
