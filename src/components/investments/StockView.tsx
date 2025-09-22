"use client";

import React, { useEffect, useRef } from 'react';

const StockView = ({ market }: { market: string }) => {
    const widgetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const createWidget = (container: HTMLDivElement | null) => {
            if (!container) return;
            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
            script.async = true;
            script.innerHTML = JSON.stringify({
                colorTheme: 'light',
                market: market,
                width: '100%',
                height: 400,
            });

            container.innerHTML = '';
            container.appendChild(script);
        };

        createWidget(widgetRef.current);
    }, [market]);

    return <div ref={widgetRef} style={{ marginBottom: '20px' }}></div>;
};

export default StockView;