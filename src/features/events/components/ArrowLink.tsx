import Link from "next/link";
import type { ReactNode } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  // "back" puts a left arrow before the label, "forward" a right arrow after.
  direction?: "back" | "forward";
  // For when the visible label doesn't say where the link goes on its own.
  ariaLabel?: string;
  className?: string;
}

// A text link with an arrow, for secondary navigation (Back, Learn More) that
// shouldn't compete with the page's buttons. The arrow nudges its way on hover.
const ArrowLink = ({
  href,
  children,
  direction = "forward",
  ariaLabel,
  className = "",
}: ArrowLinkProps) => {
  const Icon = direction === "back" ? LuArrowLeft : LuArrowRight;
  const icon = (
    <Icon
      className={`duration-fast h-4 w-4 shrink-0 transition-transform motion-reduce:transition-none ${direction === "back" ? "group-hover/link:-translate-x-1" : "group-hover/link:translate-x-1"}`}
      aria-hidden="true"
    />
  );

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`group/link text-primary hover:text-primary-light focus-visible:outline-primary duration-fast inline-flex items-center gap-1 rounded-sm text-[14px] leading-5 font-medium underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
    >
      {direction === "back" && icon}
      {children}
      {direction === "forward" && icon}
    </Link>
  );
};

export default ArrowLink;
