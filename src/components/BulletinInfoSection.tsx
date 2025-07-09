import React from "react";
import Image from "next/image";
import BulletinInfoCard from "./BulletinInfoCard";

const BulletinInfosection = () => {
  return (
    <div
      className="
      w-full pl-30 pr-30 pb-20
      text-darkBlue
      grid grid-cols-3 justify-between gap-[100px]
    "
    >
     <BulletinInfoCard title="Investing is for Everyone" imageSrc="/assets/group-icon.png" text="Our writers study a range of degrees beyond just finance, and we are bound by our collective interest in financial markets" />
     <BulletinInfoCard title="Education" imageSrc="/assets/grad-cap-icon.png" text="Education is one of our core values - all our analysts are supported in their roles through regular workshops and ongoing mentorship, assisting our team in making the best decisions when discussion the market" />
     <BulletinInfoCard title="Article Frequency" imageSrc="/assets/group-icon.png" text="Articles are published on a frequent basis and sent our to all club members" />
    </div>
  );
};

export default BulletinInfosection;
