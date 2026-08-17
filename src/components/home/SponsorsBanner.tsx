import React from "react";
import Marquee from "react-fast-marquee";
import LogoTint from "./LogoTint";
import { getSponsors } from "@/features/home/data/getSponsors";

const SponsorsBanner = async () => {
  const sponsors = await getSponsors();

  return (
    <div className="relative h-full overflow-hidden bg-white py-8 lg:h-full lg:py-14">
      <h3 className="text-darkBlue mt-[0px] text-center text-[19.04px] leading-[19.04px] font-[300] lg:mt-[40px] lg:text-[28px] lg:leading-[22px]">
        Our 2026 Sponsors and Partners
      </h3>
      <Marquee speed={120} autoFill gradient={true} gradientColor="#ffffff">
        <div className="mt-10 flex items-center justify-evenly gap-4 px-4 lg:gap-8">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="relative flex h-20 w-32 items-center">
              <LogoTint src={sponsor.logo} colorClass="bg-[#145ca9]" className="h-full w-full" />
            </div>
          ))}
        </div>
      </Marquee>
      <Marquee speed={120} autoFill gradient={true} direction="right" gradientColor="#ffffff">
        <div className="mt-10 mb-4 flex items-center justify-evenly gap-4 px-4 lg:mb-6 lg:gap-8">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="relative flex h-20 w-32 items-center">
              <LogoTint src={sponsor.logo} colorClass="bg-[#145ca9]" className="h-full w-full" />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default SponsorsBanner;
