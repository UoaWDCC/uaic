import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

interface ArrowButtonProps {
  text: string;
  link: string;
  fullWidth?: boolean;
}

const ArrowButton = ({ text, link, fullWidth = false }: ArrowButtonProps) => {
  return (
    <Link
      href={link}
      className={`group relative flex h-[37px] shrink-0 items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-4.5 py-2.5 whitespace-nowrap text-white transition-colors duration-200 hover:text-[#005EAF] sm:h-[51px] sm:gap-[8px] sm:px-[16px] sm:py-0 ${
        fullWidth ? "w-full" : "w-fit"
      }`}
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-l from-[#005EAF] to-[#249AFF] transition-opacity duration-200 group-hover:opacity-0" />

      <GoArrowUpRight className="relative z-10 hidden h-[34.36px] w-[34.36px] transition-transform duration-200 group-hover:rotate-45 sm:block" />
      <span className="relative z-10 text-sm font-medium sm:text-[20px]">{text}</span>
    </Link>
  );
};
export default ArrowButton;
