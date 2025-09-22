"use client";

import React, { useEffect, useRef } from "react";

interface StockViewProps {
  symbol: string;
  title: string;
  height?: number;
}

const StockView: React.FC<StockViewProps> = ({ symbol, title, height = 300 }) => {
  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = widgetRef.current;
    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: false,
      width: "100%",
      height,
      symbol,
      interval: "D",
      timezone: "Pacific/Auckland",
      theme: "dark",
      style: "1",
      locale: "en",
      hide_top_toolbar: true,
      hide_side_toolbar: true,
      hide_legend: false,
      hide_volume: false,
      calendar: false,
      details: false,
      backgroundColor: "#0F0F0F",
      gridColor: "rgba(242, 242, 242, 0.06)",
      save_image: true,
      withdateranges: false,
      studies: [],
      compareSymbols: [],
    });

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [symbol, height]);

  return (
    <div className="text-center">
      {/* Chart heading */}
      <h2 className="text-xl font-semibold text-blue-900 mb-4">{title}</h2>

      {/* Chart container */}
      <div
        ref={widgetRef}
        className="tradingview-widget-container mx-auto w-full max-w-3xl border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white"
        style={{ height }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default StockView;
