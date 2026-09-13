import React from "react";
import PerksGridFormat from "./PerksGridFormat";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { LuTrophy } from "react-icons/lu";
import { IoIosPeople } from "react-icons/io";

const PerksGrid = () => {
  return (
    <div className="text-darkBlue grid w-full justify-between gap-[50px] pt-10 pr-10 pb-20 pl-10 lg:grid-cols-3 lg:gap-[100px] lg:pt-10 lg:pr-30 lg:pb-20 lg:pl-30">
      <PerksGridFormat
        title="Membership Sign-Up Fee"
        icon={<FaMoneyCheckAlt />}
        text="The sign-up cost is $20 + $1.58 processing fees to become a registered member of UAIC for the remainder of the year. The full $20 fee is put towards the administration of the club."
      />
      <PerksGridFormat
        title="Free Events and Competitions"
        icon={<LuTrophy />}
        text="All events and competitions that we run are free for members, so you won’t have to pay any more fees after this"
      />
      <PerksGridFormat
        title="Join via Engage Platform"
        icon={<IoIosPeople />}
        text="Once you have completed payment, you may request to join University of Auckland Investment Club on the University's Engage platform"
      />
    </div>
  );
};

export default PerksGrid;
