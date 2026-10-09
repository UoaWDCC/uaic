import Link from "next/link";
import type { ReactNode } from "react";

interface EventPillButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "disabled";
  href?: string;
  // Opens `href` in a new tab - for links out to external registration forms.
  external?: boolean;
  onClick?: () => void;
  className?: string;
  // A second label that cross-fades in on hover / keyboard focus (e.g.
  // "Signups Open" -> "Register Now"). Pair it with `ariaLabel`, since screen
  // readers never "hover".
  hoverLabel?: ReactNode;
  // For when the visible label doesn't say what the button does on its own.
  ariaLabel?: string;
}

// Every hover transition (text colour, gradient, label swap) shares this
// duration and easing so they start and finish together.
const HOVER_TIMING = "duration-fast ease-in-out";

const BASE =
  "group rounded-pill relative flex min-h-[27px] min-w-0 flex-1 flex-row items-center justify-center gap-[10px] overflow-hidden border px-[12px] py-[4px] text-[14px] leading-[100%] sm:text-[16px] tracking-[0px] transition-colors";

const VARIANTS = {
  primary:
    "bg-surface-faint hover:border-border hover:text-primary focus-visible:border-border focus-visible:text-primary border-transparent text-white hover:cursor-pointer",
  secondary:
    "border-border bg-surface-faint text-primary hover:border-transparent hover:text-white focus-visible:border-transparent focus-visible:text-white hover:cursor-pointer",
  disabled: "border-border bg-surface-faint text-muted-foreground cursor-not-allowed",
};

// The gradient sits on its own layer so it can fade in/out on hover - a
// gradient background-image can't be transitioned directly.
const GRADIENT = {
  primary:
    "from-primary-light to-primary absolute inset-0 rounded-[inherit] bg-gradient-to-r transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0",
  secondary:
    "from-primary-light to-primary pointer-events-none absolute -inset-px rounded-[inherit] bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100",
  disabled: null,
};

// The pill buttons used on event cards and the event CTA panel. Renders a Link
// when given `href`, and a <button> otherwise - `disabled` for the disabled
// variant, so screen readers announce it as an unavailable button.
const EventPillButton = ({
  children,
  variant = "primary",
  href,
  external = false,
  onClick,
  className = "",
  hoverLabel,
  ariaLabel,
}: EventPillButtonProps) => {
  const classes = `${BASE} ${HOVER_TIMING} ${VARIANTS[variant]} ${className}`;
  const gradient = GRADIENT[variant] && `${GRADIENT[variant]} ${HOVER_TIMING}`;
  const fade = `transition-opacity ${HOVER_TIMING} col-start-1 row-start-1`;

  const content = (
    <>
      {gradient && <span className={gradient} aria-hidden="true" />}
      {/* Wraps rather than clipping on the narrowest phones (e.g. the
          full-width "Event Concluded: View Recap" at 320px). */}
      <span className="z-dropdown relative grid text-center font-[500] sm:whitespace-nowrap">
        {hoverLabel ? (
          // Both labels share one grid cell, so they cross-fade in place and
          // the pill keeps the wider label's width instead of jumping.
          <>
            <span className={`${fade} group-hover:opacity-0 group-focus-visible:opacity-0`}>
              {children}
            </span>
            <span
              aria-hidden="true"
              className={`${fade} opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100`}
            >
              {hoverLabel}
            </span>
          </>
        ) : (
          children
        )}
      </span>
    </>
  );

  if (variant === "disabled") {
    return (
      <button type="button" disabled aria-label={ariaLabel} className={classes}>
        {content}
      </button>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={classes}>
      {content}
    </button>
  );
};

export default EventPillButton;
