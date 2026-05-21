"use client";

import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

const MemberSignupButton = () => {
  const buttonClasses = `
    group inline-flex w-fit flex-row items-center justify-start gap-3 whitespace-nowrap py-2.5
    rounded-full bg-gradient-to-l from-[#005eaf] to-[#249AFF]
    pr-4.5 pl-3.5 text-sm text-white max-sm:pl-4.5 sm:text-xl
    2xl:py-5 2xl:pr-8 2xl:pl-6 2xl:gap-5 2xl:text-[35px]
    transition-colors duration-200
    hover:bg-white hover:bg-none hover:text-[#005eaf]
  `;

  return (
    <Link href="/joinus" className={buttonClasses}>
      <span className="relative flex size-5 items-center justify-center max-sm:hidden 2xl:size-9">
        <GoArrowUpRight className="absolute size-7 transition-transform duration-200 group-hover:rotate-45 2xl:size-12" />
      </span>
      <span className="font-medium">Become A Member</span>
    </Link>
  );
};

export default MemberSignupButton;
