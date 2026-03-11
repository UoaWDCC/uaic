"use client";

import React, { useEffect, useState } from "react";
import { getLandingPageImage } from "@/features/users/data/getLandingPageImage";
import Button from "../Button";

const HomePage = () => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const imageUrl = await getLandingPageImage("homepage");
      setBackgroundImage(imageUrl || "/assets/home/bull-cow-bg.webp"); // Fallback image
    };

    fetchImage();
  }, []);

  return (
    <>
      <div className="relative min-h-[500px] w-full overflow-x-hidden overflow-y-hidden lg:mt-[142px] lg:min-h-[749px]">
        {/* Background */}
        <div
          className="absolute top-0 left-0 z-[-2] min-h-[610px] w-screen bg-cover bg-center bg-no-repeat lg:min-h-screen"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        />

        {/* Transparent Overlay */}
        <div className="fixed top-0 left-0 z-[-1] h-screen w-full bg-white/50 from-white/10 to-white/0 lg:bg-[transparent] lg:bg-gradient-to-r" />

        {/* Vertical gradient overlay (bottom → top) */}
        <div className="absolute z-[-1] h-screen w-full bg-gradient-to-t from-white via-transparent via-white/100 to-white/0 lg:via-white/70" />

        {/* Foreground content */}
        <div className="relative mx-auto mt-[80px] flex h-[324] w-[305px] flex-col gap-[70px] text-center lg:mt-[118px] lg:ml-[112px] lg:h-[384] lg:w-[494px] lg:gap-[45px] lg:text-left">
          <h1 className="from-darkBlue to-babyBlue mx-[20px] bg-gradient-to-r bg-clip-text text-[41.65px] leading-[45px] font-[900] tracking-[0px] text-transparent lg:mx-0 lg:text-[75.65px] lg:leading-[85px]">
            Investing is for everyone
          </h1>

          <h3 className="mx-[20px] text-[16px] leading-[17.84px] font-[300] tracking-[0px] lg:mx-0 lg:text-[24.3px] lg:leading-[32.39px]">
            We welcome members from all academic backgrounds and stages at the University of
            Auckland.
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

export default HomePage;
