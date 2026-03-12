"use client";

import React, { useEffect, useState } from "react";
import { getLandingPageImage } from "@/features/users/data/getLandingPageImage";
import Button from "../Button";

const BulletinHeroSection = () => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const imageUrl = await getLandingPageImage("bulletin");
      setBackgroundImage(imageUrl || "/assets/home/bull-cow-bg.webp"); // fallback
    };

    fetchImage();
  }, []);

  return (
    <>
      <div className="relative min-h-[500px] w-full overflow-x-hidden overflow-y-hidden lg:min-h-[749px]">
        {/* Background */}
        <div
          className="absolute top-0 left-0 z-[-2] min-h-[610px] w-screen bg-cover bg-center bg-no-repeat lg:min-h-screen"
          style={{
            backgroundImage: `url('${backgroundImage || "/assets/home/bull-cow-bg.webp"}')`,
          }}
        />

        {/* Transparent Overlay */}
        <div className="absolute top-0 left-0 z-[-1] h-screen w-full bg-white/50 from-white/10 to-white/0 lg:bg-[transparent] lg:bg-gradient-to-r" />

        {/* Vertical gradient overlay (bottom → top) */}
        <div className="absolute z-[-1] h-screen w-full bg-[linear-gradient(to_top,white_40%,transparent_100%)] lg:bg-[linear-gradient(to_top,white_0%,white_25%,transparent_100%)]" />

        {/* Foreground content */}
        <div className="relative mx-auto mt-[80px] flex h-[324] w-[305px] flex-col gap-[70px] text-center lg:mt-[118px] lg:ml-[112px] lg:h-[384] lg:w-[494px] lg:gap-[45px] lg:text-left">
          <h1 className="mx-[20px] bg-gradient-to-r from-[#145CA9] to-[#5FB4FF] bg-clip-text text-[41.65px] leading-[45px] font-[900] tracking-[0px] text-transparent lg:mx-0 lg:text-[75.65px] lg:leading-[85px]">
            Bulletin
          </h1>

          <h3 className="mx-[20px] text-[16px] leading-[17.84px] font-[300] tracking-[0px] lg:mx-0 lg:text-[24.3px] lg:leading-[32.39px]">
            The Bulletin Team is a team of dedicated student writers and editors that actively
            publish the recurring news bulletin
          </h3>

          <div className="flex h-[53px] w-[320px] gap-[8px]">
            <Button link="/about" variant="secondary">
              About Us
            </Button>
            <Button link="/joinus">Join Us</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulletinHeroSection;
