"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import MemberSignupButton from "./MemberSignupButton";
import StockTicker from "./StockTicker";
import { GoArrowUpRight, GoArrowLeft } from "react-icons/go";
import Button from "./Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [showAboutSubpage, setShowAboutSubpage] = useState(false);
  const [showCommitteeSubpage, setShowCommitteeSubpage] = useState(false); //new committee subpage

  const handleLinkClick = () => {
    setIsOpen(false);
    setShowCommitteeSubpage(false);
    setShowAboutSubpage(false);
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
        className={`topbar flex items-center justify-between ${beyondHero ? "bg-white" : "bg-transparent"} px-6 py-2 text-[#172741] lg:p-0 lg:px-6`}
      >
        {/* Logo */}
        <Link href="/">
          <div
            className={`sticky z-50 m-0 h-[86px] w-[140px] mask-[url('/assets/logos/uaic.webp')] [mask-size:100%] mask-center mask-no-repeat transition-colors duration-500 ease-in-out lg:ml-10 lg:h-[100px] lg:w-[140px] ${isOpen ? "bg-[#145BA7]" : beyondHero ? "bg-white" : "bg-white brightness-0 invert"}`}
          />
        </Link>

        {/* Hamburger to X icon */}
        <button
          className="fixed top-6 right-2 z-50 cursor-pointer rounded-full bg-transparent p-3 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="z-50 flex h-10 w-10 flex-col items-center justify-center gap-2">
            <span
              className={`ease-[cubic-bezier(0.175, 0.885, 0.32, 1.275)] block h-[0.25rem] w-8 rounded-full transition-all transition-colors duration-300 ${isOpen ? "translate-y-[10px] -rotate-45 bg-[#145CA9]" : "bg-white"}`}
            />
            <span
              className={`ease-[cubic-bezier(0.175, 0.885, 0.32, 1.275)] block h-[0.25rem] w-8 rounded-full transition-all duration-300 ${isOpen ? "scale-x-0 opacity-0" : "bg-white"}`}
            />
            <span
              className={`ease-[cubic-bezier(0.175, 0.885, 0.32, 1.275)] block h-[0.25rem] w-8 rounded-full transition-all duration-300 ${isOpen ? "-translate-y-[14px] rotate-45 bg-[#145CA9]" : "bg-white"}`}
            />
          </div>
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
      <div
        className={`fixed top-0 z-30 w-full overflow-hidden transition-all duration-600 ease-in-out lg:hidden ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <ul className="flex w-full flex-col rounded-b-3xl bg-white pb-5 text-[#005EAF] shadow-xl/20">
          <div className="flex items-center justify-between pr-2 pb-7 pl-6">
            <div
              className={`bg-[#00529B] mask-[url('/assets/logos/uaic.webp')] [mask-size:100%] mask-center mask-no-repeat transition-opacity duration-600 ease-in-out lg:ml-10 lg:h-[100px] lg:w-[140px]`}
            ></div>
            <div className="h-15"></div>
          </div>

          <li className="hover:bg-whiteHover border-grey-100 mx-auto flex w-14/16 cursor-pointer border-b pt-3 pb-1 text-3xl font-normal sm:p-8 sm:pl-16">
            <Link href="/" className="block w-full" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li
            className={`hover:bg-whiteHover mx-auto flex w-14/16 cursor-pointer items-center justify-between text-xl font-normal transition-all ${isOpen ? "opacity-100" : "opacity-0"} `}
            onClick={() => {
              setShowAboutSubpage(!showAboutSubpage);
            }}
          >
            <div className="flex w-[100vw] cursor-pointer justify-between pt-3 pb-1 text-3xl font-normal">
              <span>About</span>
              <GoArrowUpRight
                size={40}
                className={`right-1 transition-transform duration-200 ${showAboutSubpage ? "rotate-45" : ""}`}
              />
            </div>
          </li>
          {/* Sub-menu Items */}
          <li
            className={`block overflow-hidden bg-white transition-all duration-500 ease-in-out lg:hidden ${showAboutSubpage ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <ul className="font-light text-black">
              <li className="hover:bg-whiteHover flex cursor-pointer pb-2 pl-6 text-xl sm:p-8 sm:pl-16">
                <Link
                  href=""
                  className="block w-full"
                  onClick={() => {
                    setShowAboutSubpage(!showAboutSubpage);
                    //setIsOpen(!isOpen);
                    setShowCommitteeSubpage(!showCommitteeSubpage);
                  }}
                >
                  The Committees
                </Link>
              </li>
              <li className="hover:bg-whiteHover flex cursor-pointer pb-2 pl-6 text-xl sm:p-8 sm:pl-16">
                <Link href="/FAQ" className="block w-full" onClick={handleLinkClick}>
                  FAQ
                </Link>
              </li>
            </ul>
          </li>
          {/* End of Sub-menu Items */}
          <li className="hover:bg-whiteHover border-grey-100 mx-auto flex w-14/16 cursor-pointer border-t border-b pt-3 pb-1 text-3xl font-normal sm:p-8 sm:pl-16">
            <Link href="/events" className="block w-full" onClick={handleLinkClick}>
              Events
            </Link>
          </li>
          <li className="group hover:bg-whiteHover border-grey-100 mx-auto flex w-14/16 cursor-pointer border-b pt-3 pb-1 text-3xl font-normal sm:p-8 sm:pl-16">
            <Link href="/bulletin" className="block w-full" onClick={handleLinkClick}>
              Bulletin
            </Link>
          </li>
          <li className="hover:bg-whiteHover border-grey-100 mx-auto flex w-14/16 cursor-pointer border-b pt-3 pb-1 text-3xl font-normal sm:p-8 sm:pl-16">
            <Link href="/investmentportfolio" className="block w-full" onClick={handleLinkClick}>
              Investments
            </Link>
          </li>
          <li className="mx-auto my-auto flex justify-center p-5 pt-8 text-lg font-[600] sm:text-xl lg:mr-[30px]">
            <div className="text-3xl [&_a]:px-26 [&_a]:py-4">
              <MemberSignupButton />
            </div>
          </li>
        </ul>

        {/* Committee Menu */}
        <ul
          className={`pb-4vw fixed top-0 z-40 flex w-[100vw] max-w-full transform flex-col overflow-y-hidden rounded-b-3xl bg-white text-lg text-[#005EAF] transition-all duration-500 ease-in-out sm:bottom-[16%] lg:hidden ${showCommitteeSubpage ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <div className="flex items-center justify-between p-4 px-6 pt-8">
            <div
              className={`bg-[#00529B] mask-[url('/assets/logos/uaic.webp')] [mask-size:100%] mask-center mask-no-repeat transition-opacity duration-600 ease-in-out lg:ml-10 lg:h-[100px] lg:w-[140px]`}
            ></div>
            <GoArrowLeft
              size={40}
              onClick={() => {
                setShowCommitteeSubpage(!showCommitteeSubpage);
                setShowAboutSubpage(true);
              }}
            ></GoArrowLeft>
          </div>
          <li className="hover:bg-whiteHover border-grey-100 mx-auto flex w-14/16 cursor-pointer border-b py-3 text-3xl font-normal sm:p-8 sm:pl-16">
            <Link href="/about#ExecutiveCommittee" onClick={handleLinkClick}>
              Exec Commitee
            </Link>
          </li>
          <li className="hover:bg-whiteHover border-grey-100 mx-auto flex w-14/16 cursor-pointer border-b py-3 text-3xl font-normal sm:p-8 sm:pl-16">
            <Link href="/about#BulletinComittee" onClick={handleLinkClick}>
              Bulletin Comittee
            </Link>
          </li>
          <li className="hover:bg-whiteHover border-grey-100 mx-auto flex w-14/16 cursor-pointer border-b py-3 text-3xl font-normal sm:p-8 sm:pl-16">
            <Link href="/about#InvestmentComittee" onClick={handleLinkClick}>
              Investment Comittee
            </Link>
          </li>
          <li className="mx-auto my-auto flex justify-center p-5 pt-35 text-lg font-[600] sm:text-xl lg:mr-[30px]">
            <div className="text-3xl [&_a]:px-26 [&_a]:py-4">
              <MemberSignupButton />
            </div>
          </li>
        </ul>
        <StockTicker className="m-0 block w-full" isTransparent={true} />
      </div>
      {/* Stock Ticker - Mobile */}
      <StockTicker className="shadow-xl/10 lg:hidden" isTransparent={!beyondHero} />
    </nav>
  );
};

export default Navbar;
