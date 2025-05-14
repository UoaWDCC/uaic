"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";


const Navbar = () => {
 const [isOpen, setIsOpen] = useState(false);


 {/* TradingView Widget Script*/}
 const containerRef = useRef<HTMLDivElement>(null);
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
     displayMode: 'standard',
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
     <div className="bg-white lg:bg-[#F0F8FF] text-[#172741] p-4 flex justify-between items-center">
       {/* Hamburger Menu */}
       <button
         className="lg:hidden"
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
       {/* Desktop Links */}
      <ul className="hidden lg:flex gap-4 justify-center flex-grow order-2">
        <li><a href="/" className="hover:text-[#145CA9] hover:rounded-xl p-[4px] font-[100]">Home</a></li>
        <li><a href="/about" className="hover:text-[#145CA9] hover:rounded-xl p-[4px] font-[300]">About</a></li>
        <li><a href="/events" className="hover:text-[#145CA9] hover:rounded-xl p-[4px] font-[300]">Events</a></li>
        <li><a href="/investmentportfolio" className="hover:text-[#145CA9] hover:rounded-xl p-[4px] font-[300]">Investment Portfolio</a></li>
        <li><a href="/bulletin" className="hover:text-[#145CA9] hover:rounded-xl p-[4px] font-[300]">Bulletin</a></li>
        <li><a href="/contact" className="hover:text-[#145CA9] hover:rounded-xl p-[4px] font-[300]">Contact</a></li>
      </ul>

       {/* Join Us */}
       <ul className="hidden lg:flex gap-4 ml-auto order-3 p-[10px]">
         <li><a href="/joinus" className="p-[10px] border border-solid border-[#145CA9] hover:bg-[#fff] bg-[#145CA9] rounded-4xl text-[#fff] hover:text-[#145CA9] px-[20] py-[6] font-[600] text-[14px]">Join Us</a></li>
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



     {/* Mobile Menu */}
     {isOpen && (
       <ul className="h-screen bg-[#145CA9] text-white flex-auto flex-col gap-4 lg:hidden w-full">
         <li className="p-4 border-b border-white"><a href="/" className="">Home</a></li>
         <li className="p-4 border-b border-white"><a href="/about" className="">About</a></li>
         <li className="p-4 border-b border-white"><a href="/events" className="">Events</a></li>
         <li className="p-4 border-b border-white"><a href="/investmentportfolio" className="">Investment Portfolio</a></li>
         <li className="p-4 border-b border-white"><a href="/bulletin" className="">Bulletin</a></li>
         <li className="p-4 border-b border-white"><a href="/contact" className="">Contact</a></li>
         <li className="p-4 border-b border-white"><a href="/signup" className="">Sign Up</a></li>
         <li className="p-4"><a href="/login" className="">Login</a></li>
       </ul>
     )}
   </nav>
 );
};


export default Navbar;





