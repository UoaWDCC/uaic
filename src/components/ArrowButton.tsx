import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

interface ArrowButtonProps {
  variant?: "member" | "home";
}

const ArrowButton = ({ variant = "member" }: ArrowButtonProps) => {
  return (
    <Link
      href={variant === "home" ? "/" : "/joinus"}
      data-variant={variant}
      className="group relative flex h-[37px] w-fit items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-4.5 py-2.5 whitespace-nowrap text-white transition-colors duration-200 hover:text-[#005EAF] sm:h-[51px] sm:gap-[8px] sm:px-[16px] sm:py-0 2xl:h-[86px] 2xl:gap-5 2xl:px-8"
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-l from-[#005EAF] to-[#249AFF] transition-opacity duration-200 group-hover:opacity-0" />

      <GoArrowUpRight className="relative z-10 hidden h-[34.36px] w-[34.36px] transition-transform duration-200 group-hover:rotate-45 sm:block 2xl:h-[60px] 2xl:w-[60px]" />
      <span className="relative z-10 text-sm font-medium sm:text-[20px] 2xl:text-[35px]">
        {variant === "home" ? "Back to Home" : "Become A Member"}
      </span>
    </Link>
  );
};
export default ArrowButton;
