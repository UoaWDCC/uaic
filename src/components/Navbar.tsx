"use client";
import React, { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full">

      {/* Top Bar */}
      <div className="bg-white sm:bg-[#F0F8FF] text-[#172741] p-4 flex justify-between items-center sm:flex-row-reverse">
        
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
        <ul className="hidden sm:flex gap-4 order-2 sm:order-1">
          <li><a href="/" className="hover:underline hover:bg-[#808080] hover:rounded-xl hover:text-[#fff] p-[4px]">Home</a></li>
          <li><a href="/about" className="hover:underline hover:bg-[#808080] hover:rounded-xl hover:text-[#fff] p-[4px]">About</a></li>
          <li><a href="/events" className="hover:underline hover:bg-[#808080] hover:rounded-xl hover:text-[#fff] p-[4px]">Events</a></li>
          <li><a href="/investmentportfolio" className="hover:underline hover:bg-[#808080] hover:rounded-xl hover:text-[#fff] p-[4px]">Investment Portfolio</a></li>
          <li><a href="/bulletin" className="hover:underline hover:bg-[#808080] hover:rounded-xl hover:text-[#fff] p-[4px]">Bulletin</a></li>
          <li><a href="/contact" className="hover:underline hover:bg-[#808080] hover:rounded-xl hover:text-[#fff] p-[4px]">Contact</a></li>
          <li><a href="/signup" className="hover:underline hover:bg-[#808080] bg-[#fff] rounded-xl hover:text-[#fff] p-[4px]">Sign Up</a></li>
          <li><a href="/login" className="hover:underline hover:bg-[#808080] bg-[#fff] rounded-xl hover:text-[#fff] p-[4px]">Login</a></li>
        </ul>

        {/* Logo */}
        <Image
          src="/assets/uaic.png"
          alt="Logo"
          width={140}
          height={140}
          className="order-1 sm:order-2"
        />
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="bg-[#145CA9] text-white p-4 flex flex-col gap-2 sm:hidden">
          <li className="w-full border-b border-white"><a href="/" className="hover:underline">Home</a></li>
          <li className="w-full border-b border-white"><a href="/about" className="hover:underline">About</a></li>
          <li className="w-full border-b border-white"><a href="/events" className="hover:underline">Events</a></li>
          <li className="w-full border-b border-white"><a href="/investmentportfolio" className="hover:underline">Investment Portfolio</a></li>
          <li className="w-full border-b border-white"><a href="/bulletin" className="hover:underline">Bulletin</a></li>
          <li className="w-full border-b border-white"><a href="/contact" className="hover:underline">Contact</a></li>
          <li className="w-full border-b border-white"><a href="/signup" className="hover:underline">Sign Up</a></li>
          <li><a href="/login" className="hover:underline">Login</a></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
