"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuChartNoAxesCombined, LuInfo } from "react-icons/lu";
import { RiContactsLine } from "react-icons/ri";
import { TiDocumentText,TiHome } from "react-icons/ti";
import { PiCalendarStarFill } from "react-icons/pi";


const Navbar = () => {
 const [isOpen, setIsOpen] = useState(false);
 const mobileRef = useRef<HTMLDivElement>(null);
 const desktopRef = useRef<HTMLDivElement>(null);


 useEffect(() => {
   const createWidget = (container: HTMLDivElement | null) => {
     if (!container) return;
     const script = document.createElement("script");
     script.src =
       "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
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
       isTransparent: false,
       displayMode: "regular",
       colorTheme: "light",
       locale: "en",
     });


     container.innerHTML = "";
     container.appendChild(script);
   };


   createWidget(mobileRef.current);
   createWidget(desktopRef.current);
 }, []);


 return (
   <nav className="w-full">

     {/* Mobile Widget */}
     <div className="tradingview-widget-container lg:hidden shadow-xl/10">
       <div
         className="tradingview-widget-container__widget"
         ref={mobileRef}
       ></div>
     </div>


     {/* Top Bar */}
     <div className="
        bg-transparent text-[#172741] px-6 py-2 flex justify-between items-center
        lg:bg-whiteHover lg:px-7 lg:p-0
      ">


       {/* Hamburger Menu */}
        <button
          className={`lg:hidden p-4 bg-white rounded-4xl shadow-xl/10 z-50 transition-transform duration-300 ${
            isOpen ? "invisible" : "visible"
          }`}
          
          onClick={() => setIsOpen(!isOpen)}
        >


        <svg
          className="w-10 h-10"  
          fill="none"
          stroke='var(--darkBlue)'
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg> 
        </button>




       {/* Desktop Nav */}
       <ul className=" hidden lg:flex gap-3 xl:gap-10 2xl:gap-15 justify-center flex-grow order-2 text-xl">
         <li><a href="/" className="hover:text-darkBlue hover:rounded-xl p-[4px] font-[300]">Home</a></li>
         <li><a href="/about" className="hover:text-darkBlue hover:rounded-xl p-[4px] font-[300]">About</a></li>
         <li><a href="/events" className="hover:text-darkBlue hover:rounded-xl p-[4px] font-[300]">Events</a></li>
         <li><a href="/investmentportfolio" className="hover:text-darkBlue hover:rounded-xl p-[4px] font-[300]">Investment Portfolio</a></li>
         <li><a href="/bulletin" className="hover:text-darkBlue hover:rounded-xl p-[4px] font-[300]">Bulletin</a></li>
         <li><a href="/contact" className="hover:text-darkBlue hover:rounded-xl p-[4px] font-[300]">Contact</a></li>
       </ul>


       {/* Join Us */}
       <ul className="hidden lg:flex gap-4 ml-auto order-3 ">
         <li>
           <a
             href="/joinus"
             className="border border-solid border-darkBlue hover:bg-white bg-darkBlue rounded-4xl text-white hover:text-darkBlue xl:px-[30] py-[10] lg:px-[20] font-[500] text-lg"
           >
             Join Us
           </a>
         </li>
       </ul>


       {/* Logo */}
       <Link href="/">
          <Image
            src="/assets/logos/uaic.webp"
            alt="Logo"
            width={220}
            height={220}
            className="order-1 p-4"
          />
       </Link>
     </div>


     {/* Desktop Widget */}
     <div className="tradingview-widget-container hidden lg:block">
       <div
         className="tradingview-widget-container__widget"
         ref={desktopRef}
       ></div>
     </div>


    {/* Mobile Menu */}
    <ul
      className={`
        fixed top-[10%] bottom-[10%] sm:bottom-[16%] left-0 w-[90vw] max-w-[350px]
        bg-white shadow-xl/20 rounded-3xl text-darkBlue
        flex flex-col overflow-y-auto z-40
        transform transition-transform duration-300 ease-in-out
        lg:hidden
        text-lg
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
    <div className="flex justify-between items-center px-6 py-6 ">
      <Image src="/assets/logos/uaic.webp" alt="Logo" width={150} height={150} />
      <button
        className="p-3 bg-white rounded-full"
        onClick={() => setIsOpen(false)}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="#145CA9"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

      <hr className="border-t border-darkBlue-300 w-9/10 self-center" />

      <li className="p-6 pl-14 border-b border-white flex items-center gap-5 text-lg sm:p-8 sm:pl-16 sm:text-xl hover:bg-whiteHover hover:font-semibold rounded-full">
        <TiHome size={24}/> <a href="/">Home</a>
      </li>
      <li className="p-6 pl-14 border-b border-white flex items-center gap-5 text-lg sm:p-8 sm:pl-16 sm:text-xl hover:bg-whiteHover hover:font-semibold rounded-full">
        <LuInfo size={24}/> <a href="/about">About</a>
      </li>
      <li className="p-6 pl-14 border-b border-white flex items-center gap-5 text-lg sm:p-8 sm:pl-16 sm:text-xl hover:bg-whiteHover hover:font-semibold rounded-full">
        <PiCalendarStarFill size={24}/> <a href="/events">Events</a>
      </li>
      <li className="p-6 pl-14 border-b border-white flex items-center gap-5 text-lg sm:p-8 sm:pl-16 sm:text-xl hover:bg-whiteHover hover:font-semibold rounded-full">
        <LuChartNoAxesCombined size={24}/> <a href="/investmentportfolio">Investments</a>
      </li>
      <li className="p-6 pl-14 border-b border-white flex items-center gap-5 text-lg sm:p-8 sm:pl-16 sm:text-xl hover:bg-whiteHover hover:font-semibold rounded-full">
        <TiDocumentText size={24}/> <a href="/bulletin">Bulletin</a>
      </li>
      <li className="p-6 pl-14 pb-6 border-b border-white flex items-center gap-5 text-lg sm:p-8 sm:pl-16 sm:text-xl">
        <RiContactsLine size={24}/> <a href="/contact">Contact</a>
      </li>

      <hr className="border-t border-darkBlue-300 w-9/10 self-center py-3" />

      <li className="ml-auto p-[10px] px-[30px] mr-[30px] border border-solid border-darkBlue hover:bg-white bg-darkBlue rounded-4xl text-white hover:text-darkBlue font-[600] text-lg sm:p-[16px] sm:px-[32px] sm:text-xl">
        <a href="/signin">Sign In</a>
      </li>
    </ul>

   </nav>
 );
};


export default Navbar;





