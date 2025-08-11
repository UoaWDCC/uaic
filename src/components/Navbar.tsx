"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuChartNoAxesCombined, LuInfo } from "react-icons/lu";
import { RiContactsLine } from "react-icons/ri";
import { TiDocumentText, TiHome } from "react-icons/ti";
import { PiCalendarStarFill, PiQuestion } from "react-icons/pi";
import Button from "./Button";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [showAboutSubpage, setShowAboutSubpage] = useState(false);
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
      <div
        className="
    bg-transparent text-[#172741] px-6 py-2 flex items-center justify-between
    lg:bg-whiteHover lg:px-7 lg:p-0
  "
      >
        {/* Hamburger Menu */}
        <button
          className={`lg:hidden p-4 bg-white rounded-4xl shadow-xl/10 z-50 transition-transform duration-300 ${isOpen ? "invisible" : "visible"
            }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="var(--darkBlue)"
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

        {/* Logo */}
        <Link href="/">
          <Image
            src="/assets/logos/uaic.webp"
            alt="Logo"
            width={220}
            height={220}
            className="p-4"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-3 xl:gap-10 2xl:gap-15 text-xl font-[300]">
          <li>
            <a
              href="/"
              className="hover:text-darkBlue hover:rounded-xl p-[4px]"
            >
              Home
            </a>
          </li>
          <li
            className="relative"
            onMouseEnter={() => setIsAboutDropdownOpen(true)}
            onMouseLeave={() => setIsAboutDropdownOpen(false)}
          >
            <a
              href="/about"
              className=" hover:rounded-xl p-[4px] font-[300]"
            >
              About
            </a>
            {/* Dropdown Menu */}
            {isAboutDropdownOpen && (
              <div
                className="absolute top-full left-0 bg-darkBlue text-white shadow-lg rounded-lg z-50 overflow-hidden"
                style={{ width: '220px', height: '80px' }}
              >
                <div className="flex flex-col h-full">
                  <a
                    href="/about"
                    className="flex-1 px-4 py-2 text-sm hover:bg-blue-700 flex items-center cursor-pointer rounded-t-lg font-[300]"
                  >
                    The Committees
                  </a>
                  <a
                    href="/FAQ"
                    className="flex-1 px-4 py-2 text-sm hover:bg-blue-700 flex items-center cursor-pointer rounded-b-lg font-[300]"
                  >
                    FAQ
                  </a>
                </div>
              </div>
            )}
          </li>
          <li>
            <a
              href="/events"
              className="hover:text-darkBlue hover:rounded-xl p-[4px]"
            >
              Events
            </a>
          </li>
          <li>
            <a
              href="/investmentportfolio"
              className="hover:text-darkBlue hover:rounded-xl p-[4px]"
            >
              Investment Portfolio
            </a>
          </li>
          <li>
            <a
              href="/bulletin"
              className="hover:text-darkBlue hover:rounded-xl p-[4px]"
            >
              Bulletin
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="hover:text-darkBlue hover:rounded-xl p-[4px]"
            >
              Contact
            </a>
          </li>
        </ul>

        <div className="hidden lg:block">
          <Button link="/signup" defaultSize>Join Us</Button>
        </div>

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
          <Image
            src="/assets/logos/uaic.webp"
            alt="Logo"
            width={150}
            height={150}
          />
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
          <TiHome size={24} /> <a href="/">Home</a>
        </li>
        <li
          className="p-6 pl-14 border-b border-white flex items-center justify-between text-lg sm:p-8 sm:pl-16 sm:text-xl hover:bg-whiteHover hover:font-semibold rounded-full cursor-pointer"
          onClick={() => setShowAboutSubpage(true)}
        >
          <div className="flex items-center gap-5">
            <LuInfo size={24} /> <span>About</span>
          </div>
          <IoIosArrowForward size={20} />
        </li>
        <li className="p-6 pl-14 border-b border-white flex items-center gap-5 text-lg sm:p-8 sm:pl-16 sm:text-xl hover:bg-whiteHover hover:font-semibold rounded-full">
          <PiCalendarStarFill size={24} /> <a href="/events">Events</a>
        </li>
        <li className="p-6 pl-14 border-b border-white flex items-center gap-5 text-lg sm:p-8 sm:pl-16 sm:text-xl hover:bg-whiteHover hover:font-semibold rounded-full">
          <LuChartNoAxesCombined size={24} />{" "}
          <a href="/investmentportfolio">Investments</a>
        </li>
        <li className="p-6 pl-14 border-b border-white flex items-center gap-5 text-lg sm:p-8 sm:pl-16 sm:text-xl hover:bg-whiteHover hover:font-semibold rounded-full">
          <TiDocumentText size={24} /> <a href="/bulletin">Bulletin</a>
        </li>
        <li className="p-6 pl-14 pb-6 border-b border-white flex items-center gap-5 text-lg sm:p-8 sm:pl-16 sm:text-xl">
          <RiContactsLine size={24} /> <a href="/contact">Contact</a>
        </li>

        <hr className="border-t border-darkBlue-300 w-9/10 self-center py-3" />

        <li className="ml-auto p-[10px] px-[30px] mr-[30px] border border-solid border-darkBlue hover:bg-white bg-darkBlue rounded-4xl text-white hover:text-darkBlue font-[600] text-lg sm:p-[16px] sm:px-[32px] sm:text-xl">
          <Button link="/signup">Join Us</Button>
        </li>
      </ul>

      {/* About Sub-page */}
      <div
        className={`
        pb-9
        fixed top-[10%] bottom-[10%] sm:bottom-[16%] left-0 w-[90vw] max-w-[350px]
        bg-white shadow-xl/20 rounded-3xl text-darkBlue
        flex flex-col overflow-y-auto z-50
        transform transition-transform duration-300 ease-in-out
        lg:hidden
        ${showAboutSubpage ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Header with Back Button */}
        <div className="flex items-center px-6 py-6 border-b border-gray-200">
          <button
            onClick={() => setShowAboutSubpage(false)}
            className="flex items-center gap-2 text-darkBlue hover:text-blue-700"
          >
            <IoIosArrowBack size={20} />
            <span className="text-[22px] font-semibold">Back</span>
          </button>
        </div>

        <hr className="border-t border-darkBlue-300 w-9/10 self-center" />

        {/* Sub-menu Items */}
        <div className="flex-1">
          <li className="p-6 pl-14 border-b border-white flex items-center gap-5 text-lg sm:p-8 sm:pl-16 sm:text-xl rounded-full">
            <LuInfo size={24} />
            <a
              href="/about"
              onClick={() => {
                setShowAboutSubpage(false);
                setIsOpen(false);
              }}
            >
              The Committees
            </a>
          </li>

          <li className="p-6 pl-14 pb-6 border-b border-white flex items-center gap-5 text-lg sm:p-8 sm:pl-16 sm:text-xl hover:bg-whiteHover hover:font-semibold rounded-full">
            <PiQuestion size={30} />
            <a
              href="/FAQ"
              onClick={() => {
                setShowAboutSubpage(false);
                setIsOpen(false);
              }}
            >
              FAQ
            </a>
          </li>
        </div>

        <hr className="border-t border-darkBlue-300 w-9/10 self-center py-3 " />

        <div className="ml-auto p-[10px] px-[30px] mr-[30px] border border-solid border-darkBlue bg-darkBlue rounded-4xl text-white font-[600] text-lg sm:p-[16px] sm:px-[32px] sm:text-xl">
          <a href="/signin">Sign In</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
