"use client";

import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

const MemberSignupButton = () => {
  const buttonClasses = `
    group inline-flex w-fit flex-row items-center justify-start gap-2.5 whitespace-nowrap py-2
    rounded-full bg-gradient-to-l from-[#005eaf] to-[#249AFF]
    pr-4.5 pl-3.5 text-sm text-white sm:text-base
    transition-colors duration-200
    hover:bg-white hover:bg-none hover:text-[#005eaf]
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <Link href="/joinus" className={buttonClasses}>
      <span className="relative flex size-5 items-center justify-center">
        <GoArrowUpRight className="absolute size-7 transition-transform duration-200 group-hover:rotate-45" />
      </span>
      <span className="[font-family:'Figtree',Arial,Helvetica,sans-serif] font-semibold">
        Become A Member
      </span>
    </Link>
  );
};

export default MemberSignupButton;
