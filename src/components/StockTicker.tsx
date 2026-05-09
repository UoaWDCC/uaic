"use client";
import React, { useState, useEffect, useRef } from "react";
// In current state:
// Stock ticker doesn't show up on mobile view (is it supposed to? looks like it...)
// Just completely solid white regardless of where on page it is.

const StockTicker = ({ className = "" }: { className?: string }) => {
  const mobileRef = useRef<HTMLDivElement>(null);
  // Boolean to keep track of if stock ticker should be solid.
  const [isSolid, setIsSolid] = useState(false);

  // Observe when hero section scrolls past
  useEffect(() => {
    const HERO_THRESHOLD = 676;
    const changeBackground = () => {
      if (window.scrollY > HERO_THRESHOLD && isSolid != true) {
        setIsSolid(true);
      } else {
        setIsSolid(false);
      }
    };

    changeBackground();
    window.addEventListener("scroll", changeBackground); // Updates on scroll
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

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
    mobileRef.current.innerHTML = '<div class="tradingview-widget-container__widget"></div>';
    mobileRef.current.style.backgroundColor = "transparent";
    mobileRef.current.appendChild(script);

    // Inject a style rule to ensure transparent background when not solid
    if (!isSolid) {
      const styleId = "stockticker-transparent-style";
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
          .tradingview-widget-container { background: transparent !important; background-color: transparent !important; }
          .tradingview-widget-container * { background: transparent !important; background-color: transparent !important; }
        `;
        document.head.appendChild(style);
      }
    }

    // To fix the stockticker loading as transparent.
    const forceTransparent = () => {
      if (!mobileRef.current || isSolid) return;

      mobileRef.current.style.backgroundColor = "transparent";
      const elements = mobileRef.current.querySelectorAll<HTMLElement>("*");
      elements.forEach((el) => {
        el.style.setProperty("background", "transparent", "important");
        el.style.setProperty("background-color", "transparent", "important");
      });
    };

    forceTransparent();
    const observer = new MutationObserver(() => {
      forceTransparent();
      setTimeout(forceTransparent, 100);
    });
    observer.observe(mobileRef.current, { childList: true, subtree: true, attributes: true });

    return () => observer.disconnect();
  }, [isSolid]);

  return (
    <div className={className}>
      <div
        ref={mobileRef}
        className="tradingview-widget-container"
        style={{ backgroundColor: "transparent" }}
      ></div>
    </div>
  );
};

export default StockTicker;
