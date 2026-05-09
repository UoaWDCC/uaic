"use client";
import React, { useEffect, useRef } from "react";

interface StockTickerProps {
  className?: string;
  isTransparent?: boolean;
}

const StockTicker = ({ className = "", isTransparent = false }: StockTickerProps) => {
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileRef.current) return;
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
      isTransparent,
      displayMode: "regular",
      colorTheme: "light",
      locale: "en",
    });
    mobileRef.current.innerHTML = "";
    mobileRef.current.appendChild(script);
  }, [isTransparent]);

  return (
    <div className={`tradingview-widget-container ${className}`}>
      <div className="tradingview-widget-container__widget" ref={mobileRef}></div>
    </div>
  );
};

export default StockTicker;
