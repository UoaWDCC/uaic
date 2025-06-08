"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";


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
      <div className="bg-transparent lg:bg-[#F0F8FF] text-[#172741] lg:p-0 p-4 flex justify-between items-center">

       {/* Hamburger Menu */}
        <button
          className={`lg:hidden p-4 bg-[#fff] rounded-4xl shadow-xl/10 z-50 transition-transform duration-300 ${isOpen ? "translate-x-55 translate-y-6 shadow-none scale-80 bg-transparent" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >


        <svg
          className="w-10 h-10"  
          fill="none"
          stroke="#145CA9"
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
       <ul className=" hidden lg:flex gap-4 justify-center flex-grow order-2 text-xl">
         <li><a href="/" className="hover:text-[#145CA9] hover:rounded-xl p-[4px] font-[300]">Home</a></li>
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
         width={220}
         height={220}
         className="order-1 p-4"
       />
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
        fixed top-[80px] left-0 h-[calc(90vh-220px)] w-84 bg-[#fff] shadow-xl/20 rounded-4xl text-[#145CA9] flex flex-col
        transform transition-transform duration-300 ease-in-out
        lg:hidden
        text-lg
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <Image
         src="/assets/uaic.png"
         alt="Logo"
         width={200}
         height={200}
         className="p-8"
      />

      <hr className="border-t border-[#145CA9]-300 w-9/10 self-center pb-4" /> 

      <li className="p-4 pl-10 border-b border-white flex items-center gap-6 hover:bg-[#F0F8FF] hover:font-semibold rounded-full"><Image src="/assets/Home.png" alt="Home Icon" width={24} height={24} /><a href="/">Home</a></li>
      <li className="p-4 pl-10 border-b border-white flex items-center gap-6 hover:bg-[#F0F8FF] hover:font-semibold rounded-full"><Image src="/assets/Info.png" alt="Info Icon" width={24} height={24} /><a href="/">About</a></li>
      <li className="p-4 pl-10 border-b border-white flex items-center gap-6 hover:bg-[#F0F8FF] hover:font-semibold rounded-full"><Image src="/assets/Event.png" alt="Event Icon" width={24} height={24} /><a href="/">Events</a></li>
      <li className="p-4 pl-10 border-b border-white flex items-center gap-6 hover:bg-[#F0F8FF] hover:font-semibold rounded-full"><Image src="/assets/chart.png" alt="Investments Icon" width={24} height={24} /><a href="/">Investments</a></li>
      <li className="p-4 pl-10 border-b border-white flex items-center gap-6 hover:bg-[#F0F8FF] hover:font-semibold rounded-full"><Image src="/assets/document.png" alt="IBulletinnfo Icon" width={24} height={24} /><a href="/">Bulletin</a></li>
      <li className="p-4 pl-10 pb-8 border-b border-white flex items-center gap-6"><Image src="/assets/Contact.png" alt="Contact Icon" width={24} height={24} /><a href="/">Contact</a></li>

      <hr className="border-t border-[#145CA9]-300 w-9/10 self-center py-6" /> 

      <li className="ml-auto p-[10px] border border-solid border-[#145CA9] hover:bg-[#fff] bg-[#145CA9] rounded-4xl text-[#fff] hover:text-[#145CA9] font-[600] text-[14px] w-auto px-6 mr-4">
        <a href="/signin">Sign In</a>
      </li>
    </ul>

   </nav>
 );
};


export default Navbar;





