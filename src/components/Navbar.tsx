"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";


const Navbar = () => {
 const [isOpen, setIsOpen] = useState(false);


 {/* TradingView Widget Script*/}
 const containerRef = useRef(null);
 useEffect(() => {
   const script = document.createElement('script');
   script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
   script.async = true;
   script.innerHTML = JSON.stringify({
     symbols: [
       { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500 Index' },
       { proName: 'FOREXCOM:NSXUSD', title: 'US 100 Cash CFD' },
       { proName: 'FX_IDC:EURUSD', title: 'EUR to USD' },
       { proName: 'BITSTAMP:BTCUSD', title: 'Bitcoin' },
       { proName: 'BITSTAMP:ETHUSD', title: 'Ethereum' },
     ],
     showSymbolLogo: true,
     isTransparent: false,
     displayMode: 'Compact',
     colorTheme: 'light',
     locale: 'en',
   });
   if (containerRef.current) {
     containerRef.current.innerHTML = '';
     containerRef.current.appendChild(script);
   }
 }, []);


 return (
   <nav className="w-full">


     {/* Top Bar */}
     <div className="bg-white sm:bg-[#F0F8FF] text-[#172741] p-4 flex justify-between items-center">
       {/* Hamburger Menu */}
       <button
         className="sm:hidden"
         onClick={() => setIsOpen(!isOpen)}
       >
         <svg
           className="w-6 h-6"
           fill="none"
           stroke="#145CA9"
           viewBox="0 0 24 24"
         >
           <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth={2}
             d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
           />
         </svg>
       </button>

       {/* Desktop Links */}
       <ul className="hidden sm:flex gap-4 justify-center flex-grow order-2">
         <li><a href="/" className="hover:underline hover:bg-[#808080] hover:rounded-xl hover:text-[#fff] p-[4px]">Home</a></li>
         <li><a href="/about" className="hover:underline hover:bg-[#808080] hover:rounded-xl hover:text-[#fff] p-[4px]">About</a></li>
         <li><a href="/events" className="hover:underline hover:bg-[#808080] hover:rounded-xl hover:text-[#fff] p-[4px]">Events</a></li>
         <li><a href="/investmentportfolio" className="hover:underline hover:bg-[#808080] hover:rounded-xl hover:text-[#fff] p-[4px]">Investment Portfolio</a></li>
         <li><a href="/bulletin" className="hover:underline hover:bg-[#808080] hover:rounded-xl hover:text-[#fff] p-[4px]">Bulletin</a></li>
         <li><a href="/contact" className="hover:underline hover:bg-[#808080] hover:rounded-xl hover:text-[#fff] p-[4px]">Contact</a></li>
       </ul>

       {/* Sign Up and Login */}
       <ul className="hidden sm:flex gap-4 ml-auto order-3">
         <li><a href="/signup" className="hover:underline hover:bg-[#808080] bg-[#fff] rounded-xl hover:text-[#fff] p-[4px]">Sign Up</a></li>
         <li><a href="/login" className="hover:underline hover:bg-[#808080] bg-[#fff] rounded-xl hover:text-[#fff] p-[4px]">Login</a></li>
       </ul>

       {/* Logo */}
       <Image
         src="/assets/uaic.png"
         alt="Logo"
         width={140}
         height={140}
         className="order-1"
       />
     </div>


     {/* TradingView Widget */}
     <div className={`tradingview-widget-container ${isOpen ? 'hidden' : 'block'}`}>
       <div className="tradingview-widget-container__widget" ref={containerRef}></div>
       <div className="tradingview-widget-copyright">
         <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
         </a>
       </div>
     </div>


     {/* TradingView Widget Desc. */}
     <div className={` bg-[#F0F8FF] text-[#172741] text-[12px] p-4 flex justify-center items-center ${isOpen ? 'hidden' : 'flex'}`}>
       <p className="text-center">Live market update of current stocks</p>
     </div>


     {/* Mobile Menu */}
     {isOpen && (
       <ul className="h-screen bg-[#145CA9] text-white flex-auto flex-col gap-4 sm:hidden w-full">
         <li className="p-4 border-b border-white"><a href="/" className="hover:underline">Home</a></li>
         <li className="p-4 border-b border-white"><a href="/about" className="hover:underline">About</a></li>
         <li className="p-4 border-b border-white"><a href="/events" className="hover:underline">Events</a></li>
         <li className="p-4 border-b border-white"><a href="/investmentportfolio" className="hover:underline">Investment Portfolio</a></li>
         <li className="p-4 border-b border-white"><a href="/bulletin" className="hover:underline">Bulletin</a></li>
         <li className="p-4 border-b border-white"><a href="/contact" className="hover:underline">Contact</a></li>
         <li className="p-4 border-b border-white"><a href="/signup" className="hover:underline">Sign Up</a></li>
         <li className="p-4"><a href="/login" className="hover:underline">Login</a></li>
       </ul>
     )}
   </nav>
 );
};


export default Navbar;





