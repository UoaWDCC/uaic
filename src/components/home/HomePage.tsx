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
      <div className="relative min-h-[610px] w-full overflow-x-hidden lg:-mt-[131.75px] lg:min-h-[676px]">
        {/* Background */}
        <div
          className="absolute inset-0 z-[-2] bg-cover bg-[center_20%] bg-no-repeat lg:bg-[center_0%]"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        />

        {/* Readability shade */}
        <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-black/15 via-black/10 to-black/25" />
        <div className="relative mx-auto mt-[130px] flex w-full flex-col items-center gap-[20px] text-center lg:mt-[170px] lg:ml-[100px] lg:w-[1200px] lg:items-start lg:gap-[45px] lg:text-left">
          <h1 className="mx-[30px] text-[30px] leading-[34px] font-[700] tracking-[0px] text-white lg:mx-0 lg:text-[100px] lg:leading-[120px]">
            University Of Auckland
            <br />
            Investment Club
          </h1>

          <div className="flex flex-col gap-14 lg:flex-row lg:gap-50">
            <h3 className="mx-[20px] text-[20px] leading-[24px] font-[350] tracking-[0px] text-white lg:mx-0 lg:text-[16px] lg:leading-[100%]">
              A student-run investing society. Welcoming members from all academic backgrounds and
              stages at the University of Auckland.
            </h3>

            {/* Button inline, not absolute */}
            <div className="mx-auto h-[50px] w-[240px] lg:mx-0 lg:w-[320px]">
              <Button link="/joinus">Become a Member</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
