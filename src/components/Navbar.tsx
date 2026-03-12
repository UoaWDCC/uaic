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

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const createWidget = (container: HTMLDivElement | null) => {
      if (!container) return;
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
      <div className="tradingview-widget-container shadow-xl/10 lg:hidden">
        <div className="tradingview-widget-container__widget" ref={mobileRef}></div>
      </div>

      {/* Top Bar */}
      <div className="lg:bg-whiteHover flex items-center justify-between bg-transparent px-6 py-2 text-[#172741] lg:p-0 lg:px-7">
        {/* Hamburger Menu */}
        <button
          className={`z-50 cursor-pointer rounded-4xl bg-white p-4 shadow-xl/10 transition-transform duration-300 lg:hidden ${
            isOpen ? "invisible" : "visible"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="h-10 w-10" fill="none" stroke="var(--darkBlue)" viewBox="0 0 24 24">
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
        <ul className="hidden gap-3 text-xl font-[300] lg:flex xl:gap-10 2xl:gap-15">
          <li>
            <Link href="/" className="hover:text-darkBlue cursor-pointer p-[4px] hover:rounded-xl">
              Home
            </Link>
          </li>
          <li
            className="relative"
            onMouseEnter={() => setIsAboutDropdownOpen(true)}
            onMouseLeave={() => setIsAboutDropdownOpen(false)}
          >
            <Link href="/about" className="cursor-pointer p-[4px] font-[300] hover:rounded-xl">
              About
            </Link>
            {/* Dropdown Menu */}
            {isAboutDropdownOpen && (
              <div
                className="bg-darkBlue absolute top-full left-0 z-50 overflow-hidden rounded-lg text-white shadow-lg"
                style={{ width: "220px", height: "80px" }}
              >
                <div className="flex h-full flex-col">
                  <Link
                    href="/about"
                    className="flex flex-1 cursor-pointer items-center rounded-t-lg px-4 py-2 text-sm font-[300] hover:bg-blue-700"
                  >
                    The Committees
                  </Link>
                  <Link
                    href="/FAQ"
                    className="flex flex-1 cursor-pointer items-center rounded-b-lg px-4 py-2 text-sm font-[300] hover:bg-blue-700"
                  >
                    FAQ
                  </Link>
                </div>
              </div>
            )}
          </li>
          <li>
            <Link
              href="/events"
              className="hover:text-darkBlue cursor-pointer p-[4px] hover:rounded-xl"
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              href="/investmentportfolio"
              className="hover:text-darkBlue cursor-pointer p-[4px] hover:rounded-xl"
            >
              Investment Portfolio
            </Link>
          </li>
          <li>
            <Link
              href="/bulletin"
              className="hover:text-darkBlue cursor-pointer p-[4px] hover:rounded-xl"
            >
              Bulletin
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-darkBlue cursor-pointer p-[4px] hover:rounded-xl"
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="hidden lg:block">
          <Button link="/joinus" defaultSize className="cursor-pointer">
            Join Us
          </Button>
        </div>
      </div>

      {/* Desktop Widget */}
      <div className="tradingview-widget-container hidden lg:block">
        <div className="tradingview-widget-container__widget" ref={desktopRef}></div>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`text-darkBlue fixed top-[10%] bottom-[10%] left-0 z-40 flex w-[90vw] max-w-[350px] transform flex-col overflow-y-auto rounded-3xl bg-white text-lg shadow-xl/20 transition-transform duration-300 ease-in-out sm:bottom-[16%] lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"} `}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Image src="/assets/logos/uaic.webp" alt="Logo" width={150} height={150} />
          <button
            className="cursor-pointer rounded-full bg-white p-3"
            onClick={() => setIsOpen(false)}
          >
            <svg className="h-8 w-8" fill="none" stroke="#145CA9" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <hr className="border-darkBlue-300 w-9/10 self-center border-t" />

        <li className="hover:bg-whiteHover flex cursor-pointer items-center gap-5 rounded-full border-b border-white p-6 pl-14 text-lg hover:font-semibold sm:p-8 sm:pl-16 sm:text-xl">
          <TiHome size={24} />{" "}
          <Link href="/" onClick={handleLinkClick}>
            Home
          </Link>
        </li>
        <li
          className="hover:bg-whiteHover flex cursor-pointer items-center justify-between rounded-full border-b border-white p-6 pl-14 text-lg hover:font-semibold sm:p-8 sm:pl-16 sm:text-xl"
          onClick={() => {
            setShowAboutSubpage(true);
            handleLinkClick();
          }}
        >
          <div className="flex items-center gap-5">
            <LuInfo size={24} /> <span>About</span>
          </div>
          <IoIosArrowForward size={20} />
        </li>
        <li className="hover:bg-whiteHover flex cursor-pointer items-center gap-5 rounded-full border-b border-white p-6 pl-14 text-lg hover:font-semibold sm:p-8 sm:pl-16 sm:text-xl">
          <PiCalendarStarFill size={24} />{" "}
          <Link href="/events" onClick={handleLinkClick}>
            Events
          </Link>
        </li>
        <li className="hover:bg-whiteHover flex cursor-pointer items-center gap-5 rounded-full border-b border-white p-6 pl-14 text-lg hover:font-semibold sm:p-8 sm:pl-16 sm:text-xl">
          <LuChartNoAxesCombined size={24} />{" "}
          <Link href="/investmentportfolio" onClick={handleLinkClick}>
            Investments
          </Link>
        </li>
        <li className="hover:bg-whiteHover flex cursor-pointer items-center gap-5 rounded-full border-b border-white p-6 pl-14 text-lg hover:font-semibold sm:p-8 sm:pl-16 sm:text-xl">
          <TiDocumentText size={24} />{" "}
          <Link href="/bulletin" onClick={handleLinkClick}>
            Bulletin
          </Link>
        </li>
        <li className="hover:bg-whiteHover flex cursor-pointer items-center gap-5 rounded-full border-b border-white p-6 pb-6 pl-14 text-lg hover:font-semibold sm:p-8 sm:pl-16 sm:text-xl">
          <RiContactsLine size={24} />{" "}
          <Link href="/contact" onClick={handleLinkClick}>
            Contact
          </Link>
        </li>

        <hr className="border-darkBlue-300 w-9/10 self-center border-t py-3" />

        <li className="mr-[30px] ml-auto text-lg font-[600] sm:text-xl">
          <Button link="/joinus" className="p-[10px] px-[40px] sm:p-[12px] sm:px-[48px]">
            Join Us
          </Button>
        </li>
      </ul>

      {/* About Sub-page */}
      <div
        className={`text-darkBlue fixed top-[10%] bottom-[10%] left-0 z-50 flex w-[90vw] max-w-[350px] transform flex-col overflow-y-auto rounded-3xl bg-white pb-9 shadow-xl/20 transition-transform duration-300 ease-in-out sm:bottom-[16%] lg:hidden ${showAboutSubpage ? "translate-x-0" : "-translate-x-full"} `}
      >
        {/* Header with Back Button */}
        <div className="flex items-center border-b border-gray-200 px-6 py-6">
          <button
            onClick={() => setShowAboutSubpage(false)}
            className="text-darkBlue flex items-center gap-2 hover:text-blue-700"
          >
            <IoIosArrowBack size={20} />
            <span className="text-[22px] font-semibold">Back</span>
          </button>
        </div>

        <hr className="border-darkBlue-300 w-9/10 self-center border-t" />

        {/* Sub-menu Items */}
        <div className="flex-1">
          <li className="hover:bg-whiteHover flex cursor-pointer items-center gap-5 rounded-full border-b border-white p-6 pl-14 text-lg hover:font-semibold sm:p-8 sm:pl-16 sm:text-xl">
            <LuInfo size={24} />
            <Link
              href="/about"
              onClick={() => {
                setShowAboutSubpage(false);
                setIsOpen(false);
              }}
            >
              The Committees
            </Link>
          </li>

          <li className="hover:bg-whiteHover flex cursor-pointer items-center gap-5 rounded-full border-b border-white p-6 pb-6 pl-14 text-lg hover:font-semibold sm:p-8 sm:pl-16 sm:text-xl">
            <PiQuestion size={30} />
            <Link
              href="/FAQ"
              onClick={() => {
                setShowAboutSubpage(false);
                setIsOpen(false);
              }}
            >
              FAQ
            </Link>
          </li>
        </div>

        <hr className="border-darkBlue-300 w-9/10 self-center border-t py-3" />

        <div className="border-darkBlue bg-darkBlue hover:text-darkBlue mr-[30px] ml-auto rounded-4xl border border-solid p-[10px] px-[30px] text-lg font-[600] text-white hover:bg-white sm:p-[16px] sm:px-[32px] sm:text-xl">
          <Link href="/payment">Membership Payment</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
