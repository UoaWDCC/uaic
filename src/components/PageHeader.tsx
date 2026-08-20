import type { ReactNode } from "react";

type PageHeaderProps = {
  kicker: string;
  title: string;
  description: string;
  action?: ReactNode;
  underline?: boolean;
  className?: string;
};

// Shared "Readup"-style page header (kicker + title + description, with an
// optional action e.g. a button) used across top-level pages like Bulletin
// and Events so they stay visually consistent.
const PageHeader = ({
  kicker,
  title,
  description,
  action,
  underline = false,
  className = "",
}: PageHeaderProps) => {
  return (
    <div className={`flex flex-col gap-3 lg:gap-[17px] ${className}`}>
      <p className="text-[22px] leading-none font-bold text-[#249AFF] lg:text-[34.27px]">
        {kicker}
      </p>
      <h1
        className={`w-fit text-[42px] leading-[0.895] font-bold text-[#0B1A2B] sm:text-[52px] lg:text-[65.11px] ${
          underline ? "border-b-4 border-[#249AFF] pb-2" : ""
        }`}
      >
        {title}
      </h1>
      <p className="mt-1 max-w-[728px] text-[14px] leading-[1.5625] font-normal text-[#0B1A2B] lg:mt-2 lg:text-[16px]">
        {description}
      </p>
      {action && <div className="mt-6 lg:mt-8">{action}</div>}
    </div>
  );
};

export default PageHeader;
