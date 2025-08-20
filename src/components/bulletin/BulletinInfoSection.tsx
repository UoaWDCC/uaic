import React from "react";
import BulletinInfoCard from "./BulletinInfoCard";
import { MdGroups } from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";
import { LuAlarmClockCheck } from "react-icons/lu";

const BulletinInfosection = () => {
  return (
    <div
      className="
      w-full 
      text-darkBlue
      grid justify-between 
      
      gap-[60px]
      pl-20 pr-20 pb-10
      
      lg:pl-30 lg:pr-30 lg:pb-20
      lg:grid-cols-3 
      lg:gap-[100px]
    "
    >
      <BulletinInfoCard
        title="Investing is for Everyone"
        icon={<MdGroups />}
        text="Our writers study a range of degrees beyond just finance, and we are bound by our collective interest in financial markets"
      />
      <BulletinInfoCard
        title="Education"
        icon={<RiGraduationCapFill />}
        text="Education is one of our core values - all our analysts are supported in their roles through regular workshops and ongoing mentorship, assisting our team in making the best decisions when discussion the market"
      />
      <BulletinInfoCard
        title="Article Frequency"
        icon={<LuAlarmClockCheck />}
        text="Articles are published on a frequent basis and sent our to all club members"
      />
    </div>
  );
};

export default BulletinInfosection;
