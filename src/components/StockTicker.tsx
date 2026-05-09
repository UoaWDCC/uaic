"use client";
import React, { useState, useEffect, useRef } from "react";
// In current state:
// Stock ticker doesn't show up on mobile view (is it supposed to? looks like it...)
// Just completely solid white regardless of where on page it is.

const StockTicker = ({ className = "" }: { className?: string }) => {
  const mobileRef = useRef<HTMLDivElement>(null);
  const [isSolid, setIsSolid] = useState(false);

  // Observe when hero section scrolls past
  useEffect(() => {
    const HERO_THRESHOLD = 338;
    const changeBackground = () => {
      if (window.scrollY > HERO_THRESHOLD) {
        setIsSolid(true);
      } else {
        setIsSolid(false);
      }
    };

    changeBackground();
    window.addEventListener("scroll", changeBackground); // Updates on scroll
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

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
      isTransparent: !isSolid,
      displayMode: "regular",
      colorTheme: "light",
      locale: "en",
    });
    mobileRef.current.innerHTML = "";
    mobileRef.current.appendChild(script);
  }, [isSolid]);

  return (
    <div className={`tradingview-widget-container ${className}`}>
      <div
        key={isSolid ? "solid" : "transparent"}
        className="tradingview-widget-container__widget"
        ref={mobileRef}
      />
    </div>
  );
};

export default StockTicker;
