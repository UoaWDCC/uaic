import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
const MemberSignupButton = () => {
  return (
    <Link
      href="/joinus"
      className="group flex h-[51px] w-[249.36px] items-center justify-center gap-[8px] rounded-[39px] bg-white bg-gradient-to-l from-[#005EAF] to-[#249AFF] pr-[16px] pl-[10px] text-white transition-colors hover:bg-none hover:text-[#005EAF]"
    >
      <GoArrowUpRight className="h-[34.36px] w-[34.36px] transition-transform group-hover:rotate-45" />
      <span className="text-[20px] font-medium">Become A Member</span>
    </Link>
  );
};
export default MemberSignupButton;
