"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuChartNoAxesCombined, LuInfo } from "react-icons/lu";
import { RiContactsLine } from "react-icons/ri";
import { TiDocumentText, TiHome } from "react-icons/ti";
import { PiCalendarStarFill, PiQuestion } from "react-icons/pi";
import MemberSignupButton from "./MemberSignupButton";
import { IoIosArrowBack } from "react-icons/io"; //IoIosArrowForward
import StockTicker from "./StockTicker";
import { GoArrowUpRight } from "react-icons/go";
import Button from "./Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [showAboutSubpage, setShowAboutSubpage] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const [beyondHero, setBeyondHero] = useState(false);

  useEffect(() => {
    const scrollHero = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setBeyondHero(heroBottom < 0);
    };
    scrollHero();
    window.addEventListener("scroll", scrollHero);
    return () => {
      window.removeEventListener("scroll", scrollHero);
    };
  }, []);

  return (
    <nav className="w-full">
      {/* Top Bar */}
      <div
        className={`topbar flex items-center justify-between ${beyondHero ? "bg-white" : "bg-transparent"} px-6 py-0 text-[#172741] lg:p-0 lg:px-6`}
      >
        {/* Logo */}
        <Link href="/">
          <div
            className={`m-0 h-[86px] w-[140px] bg-[#00529B] mask-[url('/assets/logos/uaic.webp')] [mask-size:100%] mask-center mask-no-repeat lg:ml-10 lg:h-[100px] lg:w-[140px] ${beyondHero ? "" : "brightness-0 invert"}`}
          />
        </Link>

        {/* Hamburger Menu */}
        <button
          className={`z-50 cursor-pointer rounded-4xl transition-transform duration-300 lg:hidden ${
            isOpen ? "invisible" : "visible"
          } `}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="h-10 w-10"
            fill="none"
            stroke={`${beyondHero ? "#00529B" : "white"}`}
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
        <ul className="hidden text-xl font-[300] lg:ml-auto lg:flex lg:gap-9">
          <li>
            <Link
              href="/"
              className={`cursor-pointer p-[4px] hover:rounded-xl hover:text-blue-400 lg:text-lg ${beyondHero ? "text-[#00529B]" : "text-white"}`}
            >
              Home
            </Link>
          </li>
          <li
            className="relative"
            onMouseEnter={() => setIsAboutDropdownOpen(true)}
            onMouseLeave={() => setIsAboutDropdownOpen(false)}
          >
            <Link
              href="/about"
              className={`cursor-pointer p-[4px] font-[300] hover:rounded-xl hover:text-blue-400 lg:text-lg ${beyondHero ? "text-[#00529B]" : "text-white"}`}
            >
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
              className={`cursor-pointer p-[4px] hover:rounded-xl hover:text-blue-400 lg:text-lg ${beyondHero ? "text-[#00529B]" : "text-white"}`}
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              href="/bulletin"
              className={`cursor-pointer p-[4px] hover:rounded-xl hover:text-blue-400 lg:text-lg ${beyondHero ? "text-[#00529B]" : "text-white"}`}
            >
              Bulletin
            </Link>
          </li>
          <li>
            <Link
              href="/investmentportfolio"
              className={`cursor-pointer p-[4px] hover:rounded-xl hover:text-blue-400 lg:text-lg ${beyondHero ? "text-[#00529B]" : "text-white"}`}
            >
              Investments
            </Link>
          </li>
        </ul>

        <div className="hidden lg:block lg:ps-8 lg:pe-15">
          <Button link="/joinus" className="cursor-pointer p-4 py-1.5 text-lg text-white">
            Join Us
          </Button>
        </div>
      </div>

      {/* Stock Ticker - Desktop */}
      <StockTicker className="hidden lg:block" isTransparent={!beyondHero} />
      {/* Mobile Menu */}
      <ul
        className={`text-darkBlue fixed top-0 z-40 flex w-[100vw] max-w-full transform flex-col overflow-y-hidden rounded-b-3xl bg-white text-lg shadow-xl/20 transition-transform transition-discrete duration-300 ease-in-out sm:bottom-[16%] lg:hidden ${isOpen ? "translate-y-0" : "-translate-y-full"} `}
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
          className={`hover:bg-whiteHover flex cursor-pointer items-center justify-between rounded-full border-b border-white p-6 pl-14 text-lg hover:font-semibold sm:p-8 sm:pl-16 sm:text-xl`}
          onClick={() => {
            setShowAboutSubpage(true);
            //handleLinkClick();
          }}
        >
          <div className="flex items-center gap-5">
            <LuInfo size={24} /> <span>About</span>
          </div>
          <GoArrowUpRight
            size={24}
            className="absolute right-10 transition-transform duration-200"
            onClick={() => setShowAboutSubpage(true)}
          />
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

        <hr className="border-darkBlue-300 w-9/10 self-center border-t" />

        <li className="mx-auto my-auto flex justify-center p-5 text-lg font-[600] sm:text-xl lg:mr-[30px]">
          <MemberSignupButton link="/joinus" defaultsize={false} className="width=5/6">
            Join Us
          </MemberSignupButton>
        </li>
      </ul>

      {/* Stock Ticker - Mobile */}
      <StockTicker className="shadow-xl/10 lg:hidden" isTransparent={!beyondHero} />

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
