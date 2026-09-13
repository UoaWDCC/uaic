import React from "react";
import Marquee from "react-fast-marquee";
import LogoTint from "./LogoTint";
import { getSponsors } from "@/features/home/data/getSponsors";

const sponsorBarStylings = "mt-10 flex items-center justify-evenly gap-[36px] px-4 lg:gap-[64px]";

const SponsorsBanner = async () => {
  const sponsors = await getSponsors();

  const bar1 = sponsors.filter((_, index) => index % 2 === 0);
  const bar2 = sponsors.filter((_, index) => index % 2 !== 0);

  return (
    <div className="relative mb-4 h-full overflow-hidden bg-white py-8 lg:h-full lg:py-14">
      <h3 className="text-darkBlue mt-[0px] text-center text-[19.04px] leading-[19.04px] font-[300] lg:mt-[40px] lg:text-[28px] lg:leading-[22px]">
        Our 2026 Sponsors and Partners
      </h3>
      <Marquee speed={120} autoFill gradient={true} gradientColor="#ffffff">
        <div className={`${sponsorBarStylings}`}>
          {bar1.map((sponsor) => (
            <div
              key={sponsor.id}
              className="relative flex h-16 items-center justify-center"
              style={{
                aspectRatio:
                  sponsor.logoWidth && sponsor.logoHeight
                    ? `${sponsor.logoWidth} / ${sponsor.logoHeight}`
                    : "1 / 1",
              }}
            >
              <LogoTint src={sponsor.logo} colorClass="bg-darkBlue" className="h-full w-full" />
            </div>
          ))}
        </div>
      </Marquee>
      <Marquee speed={120} autoFill gradient={true} direction="right" gradientColor="#ffffff">
        <div className={`${sponsorBarStylings}`}>
          {bar2.map((sponsor) => (
            <div
              key={sponsor.id}
              className="relative flex h-16 items-center justify-center"
              style={{
                aspectRatio:
                  sponsor.logoWidth && sponsor.logoHeight
                    ? `${sponsor.logoWidth} / ${sponsor.logoHeight}`
                    : "1 / 1",
              }}
            >
              <LogoTint src={sponsor.logo} colorClass="bg-darkBlue" className="h-full w-full" />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default SponsorsBanner;
