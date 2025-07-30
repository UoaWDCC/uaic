import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      {/* This is to hide disable the scrolling horizontally of the background */}
      <div
        className="
            relative w-full 
            overflow-x-hidden 
            overflow-y-hidden 
            mt-[166.19px]
            min-h-[500px]
            lg:min-h-[749px]
            "
      >
        {/* Background */}
        <div
          className="
                    fixed top-0 left-0 
                    w-screen min-h-[610px]
                    bg-center bg-no-repeat bg-cover
                    lg:min-h-screen 
                    lg:absolute
                    z-[-2]
                    "
          style={{
            backgroundImage: "url('/assets/home/bull-cow-bg.webp')",
          }}
        />

        {/* Transparent Overlay */}
        <div
          className="
                    fixed top-0 left-0
                    w-full h-screen
                    bg-white/50
                    lg:bg-[transparent]
                    lg:bg-gradient-to-r from-white/10 to-white/0
                    z-[-1]
                    "
        />

        {/* Vertical gradient overlay (bottom → top) */}
        <div
          className="
                    absolute
                    w-full h-screen
                    bg-gradient-to-t from-white via-white/100 lg:via-white/70 via-transparent to-white/0
                    z-[-1]
                "
        />

        {/* Foreground content */}
        <div
          className="
                relative 
                w-[305px] h-[324] mt-[80px] gap-[70px]
                flex flex-col 
                mx-auto 
                text-center
                lg:text-left 
                lg:w-[494px] lg:h-[384] lg:mt-[118px] lg:ml-[112px]
                lg:gap-[45px]
                "
        >
          <h1
            className="
                    font-[900] tracking-[0px]
                    bg-gradient-to-r from-darkBlue to-babyBlue bg-clip-text text-transparent
                    text-[41.65px] leading-[45px] mx-[20px]
                    lg:text-[75.65px] lg:leading-[85px] lg:mx-0"
          >
            Investing is for everyone
          </h1>

          <h3
            className="
                    font-[300] tracking-[0px] text-[16px] leading-[17.84px] mx-[20px]
                    lg:text-[24.3px] lg:leading-[32.39px] lg:mx-0"
          >
            We welcome members from all academic backgrounds and stages at the
            University of Auckland.
          </h3>

          <div className="flex gap-[10px] font-[600] text-[19.68px] leading-[20.91px]">
            <button
              className="w-[146.03px] h-[46.23px] text-darkBlue
                            bg-white border-[2.26px] border-darkBlue rounded-[50px]"
            >
              <Link href="/signup">About Us</Link>
            </button>
            <button
              className="w-[146.03px] h-[46.23px] text-white
                            bg-darkBlue rounded-[50px]"
            >
              <Link href="/login">Join Us</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
