"use client";
import React, { useState, useEffect, useRef } from "react";
// In current state:
// Stock ticker doesn't show up on mobile view (is it supposed to? looks like it...)
// Just completely solid white regardless of where on page it is.

const StockTicker = ({ className = "" }: { className?: string }) => {
  const mobileRef = useRef<HTMLDivElement>(null);
  // Boolean to keep track of if stock ticker should be solid.
  const [isSolid, setIsSolid] = useState<boolean>(false);

  // Loads the trading view widget
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
      isTransparent: !isSolid, // toggles depending on state (past hero or not)
      displayMode: "regular",
      colorTheme: "light",
      locale: "en",
    });
    mobileRef.current.innerHTML = "";
    mobileRef.current.appendChild(script);
  }, [isSolid]);

  // Observe when hero section scrolls past
  useEffect(() => {
    const heroElement = document.getElementById("hero");
    if (!heroElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSolid(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(heroElement);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`stockticker-widget ${className} ${isSolid ? "solid" : "transparent"}`}>
      <div className="stockticker-widget" ref={mobileRef}></div>
    </div>
  );
};

export default StockTicker;
