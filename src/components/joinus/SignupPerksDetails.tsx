import React from "react";
import SignupPerksFormat from "./SignupPerksFormat";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { LuTrophy } from "react-icons/lu";
import { IoIosPeople } from "react-icons/io";

const SignupPerksDetails = () => {
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
      <SignupPerksFormat
        title="Membership Sign-Up Fee"
        icon={<FaMoneyCheckAlt />}
        text="The sign-up cost is $20 + $1.58 processing fees to become a registered member of UAIC for the remainder of the year. The full $20 fee is put towards the administration of the club."
      />
      <SignupPerksFormat
        title="Free Events and Competitions"
        icon={<LuTrophy />}
        text="All events and competitions that we run are free for members, so you won’t have to pay any more fees after this"
      />
      <SignupPerksFormat
        title="Join via Engage Platform"
        icon={<IoIosPeople />}
        text="Once you have completed payment, you may request to join University of Auckland Investment Club on the University's Engage platform"
      />
    </div>
  );
};

export default SignupPerksDetails;
