import type { ReactNode } from "react";

type PageHeaderProps = {
  kicker: string;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

// Shared "Readup"-style page header (kicker + title + description, with an
// optional action e.g. a button) used across top-level pages like Bulletin
// and Events so they stay visually consistent.
const PageHeader = ({ kicker, title, description, action, className = "" }: PageHeaderProps) => {
  return (
    <div className={`flex flex-col gap-3 lg:gap-[17px] ${className}`}>
      <p className="text-primary-light text-[22px] leading-none font-bold lg:text-[34.27px]">
        {kicker}
      </p>
      <h1 className="text-ink w-fit text-[42px] leading-[0.895] font-bold sm:text-[52px] lg:text-[65.11px]">
        {title}
      </h1>
      <p className="text-ink mt-1 max-w-[728px] text-[14px] leading-[1.5625] font-normal lg:mt-2 lg:text-[16px]">
        {description}
      </p>
      {action && <div className="mt-6 lg:mt-8">{action}</div>}
    </div>
  );
};

export default PageHeader;
