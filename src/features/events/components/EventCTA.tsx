import Link from "next/link";
import type { ReactNode } from "react";
import { LuCircleCheck, LuLock } from "react-icons/lu";
import EventPillButton from "@/features/events/components/EventPillButton";
import {
  getEventRegistrationHref,
  type RegistrationStatus,
} from "@/features/events/lib/registrationStatus";

const JOIN_HREF = "/joinus";
const SIGN_IN_HREF = "/login";

interface EventCTAProps {
  status: RegistrationStatus;
  eventId: string;
  registrationLink?: string | null;
  // "Learn More" opens whichever of these is given; with neither it's hidden
  // (e.g. on the event's own page, where there's nothing more to learn).
  onLearnMore?: () => void;
  learnMoreHref?: string;
  // "card" sits inline at the bottom of an event card; "panel" is the
  // standalone boxed version from the Figma EventCTA component (#458).
  layout?: "card" | "panel";
}

// EventDetails supplies a fluid pixel unit on desktop; other consumers keep
// the original dimensions through the 1px fallback.
const Heading = ({
  children,
  icon,
  panel = false,
}: {
  children: ReactNode;
  icon?: ReactNode;
  panel?: boolean;
}) => (
  <p
    className={`text-ink flex items-center gap-[calc(8*var(--event-panel-unit,1px))] ${panel ? `text-[calc(20*var(--event-panel-unit,1px))] leading-[1.2] ${icon ? "font-medium" : "font-normal"}` : "text-[18px] leading-[24px] font-medium"}`}
  >
    {icon}
    {children}
  </p>
);

const Subtext = ({ children }: { children: ReactNode }) => (
  <p className="text-muted-foreground text-[calc(14*var(--event-panel-unit,1px))] leading-[1.428571]">
    {children}
  </p>
);

// Stacked on phones: two half-width pills are too narrow for labels like
// "No Spots Remaining" below roughly 500px.
// Links to the onsite registration page. Until that page exists (see
// ONSITE_REGISTRATION_LIVE) it falls back to the event's external form if it
// has one, so onsite-signup events stay registerable; with neither it's a
// neutral disabled pill rather than a promise of when registration opens.
const OnsiteButton = ({
  href,
  fallbackLink,
  children,
  size,
}: {
  href: string | null;
  fallbackLink?: string | null;
  children: ReactNode;
  size?: "card" | "panel";
}) => {
  if (href)
    return (
      <EventPillButton href={href} size={size}>
        {children}
      </EventPillButton>
    );
  if (fallbackLink) {
    return (
      <EventPillButton href={fallbackLink} external size={size}>
        {children}
      </EventPillButton>
    );
  }
  return (
    <EventPillButton variant="disabled" size={size}>
      Registration Unavailable
    </EventPillButton>
  );
};

const ButtonRow = ({ children }: { children: ReactNode }) => (
  <div className="flex w-full flex-col items-stretch gap-[calc(10*var(--event-panel-unit,1px))] sm:flex-row sm:gap-[calc(24*var(--event-panel-unit,1px))]">
    {children}
  </div>
);

// The registration call-to-action for one event. Each `status` maps to one
// Figma variant - all the deciding happens in `getRegistrationStatus`, this
// only renders the result.
const EventCTA = ({
  status,
  eventId,
  registrationLink,
  onLearnMore,
  learnMoreHref,
  layout = "card",
}: EventCTAProps) => {
  const isPanel = layout === "panel";
  const registrationHref = getEventRegistrationHref(eventId);
  const buttonSize = isPanel ? "panel" : "card";

  const learnMore =
    onLearnMore || learnMoreHref ? (
      <EventPillButton variant="secondary" onClick={onLearnMore} href={learnMoreHref}>
        Learn More
      </EventPillButton>
    ) : null;

  const renderContent = () => {
    switch (status) {
      case "open":
        // Figma's details panel keeps the heading on desktop. On mobile it
        // shows only the centered invitation; cards keep their existing copy.
        if (isPanel) {
          return (
            <>
              <div>
                <p className="text-ink hidden text-[calc(20*var(--event-panel-unit,1px))] leading-[1.2] lg:block">
                  Open event — no signup required
                </p>
                <p className="text-muted-foreground text-center text-[calc(20*var(--event-panel-unit,1px))] leading-[1.1] lg:mt-[calc(4*var(--event-panel-unit,1px))] lg:text-left lg:leading-[1.2]">
                  This event is open to everyone. Just show up!
                </p>
              </div>
              {learnMore}
            </>
          );
        }
        return (
          <div className="gap-comfortable flex w-full flex-col lg:flex-row lg:items-end">
            <div className="min-w-0 lg:flex-1">
              <Heading>Open event — no signup required</Heading>
              <Subtext>This event is open to everyone. Just show up!</Subtext>
            </div>
            {learnMore && <div className="flex lg:flex-1">{learnMore}</div>}
          </div>
        );

      case "external":
      case "requires-signup":
        return (
          <>
            {isPanel && status === "requires-signup" && (
              <Heading panel>No membership required</Heading>
            )}
            <ButtonRow>
              {/* "external" never has an onsite page - its form is the link. */}
              <OnsiteButton
                href={status === "external" ? null : registrationHref}
                fallbackLink={registrationLink}
                size={buttonSize}
              >
                {isPanel && status === "requires-signup" ? "Complete Registration" : "Register Now"}
              </OnsiteButton>
              {learnMore}
            </ButtonRow>
          </>
        );

      case "members-only":
        return (
          <>
            <Heading panel={isPanel}>Members only</Heading>
            <ButtonRow>
              <OnsiteButton
                href={registrationHref}
                fallbackLink={registrationLink}
                size={buttonSize}
              >
                {isPanel ? "Complete Registration" : "Register Now"}
              </OnsiteButton>
              {learnMore}
            </ButtonRow>
          </>
        );

      case "members-only-logged-out":
      case "members-only-non-member":
        return (
          <div
            className={`flex w-full flex-col ${isPanel ? "gap-[calc(24*var(--event-panel-unit,1px))]" : "gap-comfortable lg:flex-row lg:items-end"}`}
          >
            <div className="flex min-w-0 items-start gap-[calc(10*var(--event-panel-unit,1px))] lg:flex-1">
              <span
                className={`border-primary-light text-primary-light mt-[calc(2*var(--event-panel-unit,1px))] flex flex-shrink-0 items-center justify-center rounded-full border-[1.5px] ${isPanel ? "h-[calc(32*var(--event-panel-unit,1px))] w-[calc(32*var(--event-panel-unit,1px))]" : "h-6 w-6"}`}
              >
                <LuLock
                  size={isPanel ? 16 : 12}
                  className={
                    isPanel
                      ? "h-[calc(16*var(--event-panel-unit,1px))] w-[calc(16*var(--event-panel-unit,1px))]"
                      : undefined
                  }
                  aria-hidden="true"
                />
              </span>
              <div className="min-w-0">
                <Heading panel={isPanel}>Members only</Heading>
                <Subtext>Signup for this event requires an active membership.</Subtext>
              </div>
            </div>
            <div className="flex flex-col items-stretch gap-[calc(8*var(--event-panel-unit,1px))] lg:flex-1">
              <EventPillButton href={JOIN_HREF} size={buttonSize}>
                {isPanel ? "Become A Member" : "Join to Register"}
              </EventPillButton>
              {status === "members-only-logged-out" && (
                <p className="text-muted-foreground text-center text-[calc(12*var(--event-panel-unit,1px))]">
                  Already a member?{" "}
                  <Link
                    href={SIGN_IN_HREF}
                    className="text-primary hover:text-primary-light underline"
                  >
                    Sign in
                  </Link>
                </p>
              )}
            </div>
          </div>
        );

      case "in-progress":
      case "in-progress-external":
      case "in-progress-closed": {
        // Same layout as "Event full". Still registerable -> a blue pill that
        // reads "Signups Open" and turns into "Register Now" on hover/focus;
        // closed (or nowhere to register) -> grey and not clickable.
        const target =
          status === "in-progress"
            ? registrationHref
              ? { href: registrationHref, external: false }
              : registrationLink
                ? { href: registrationLink, external: true }
                : null
            : status === "in-progress-external" && registrationLink
              ? { href: registrationLink, external: true }
              : null;

        return (
          <>
            <Heading panel={isPanel}>Event in progress</Heading>
            <ButtonRow>
              {target ? (
                <EventPillButton
                  href={target.href}
                  external={target.external}
                  ariaLabel="Signups open - Register Now"
                  hoverLabel="Register Now"
                  size={buttonSize}
                >
                  Signups Open
                </EventPillButton>
              ) : (
                <EventPillButton variant="disabled" size={buttonSize}>
                  Signups Closed
                </EventPillButton>
              )}
              {learnMore}
            </ButtonRow>
          </>
        );
      }

      case "full":
        return (
          <>
            <Heading panel={isPanel}>Event full</Heading>
            <ButtonRow>
              <EventPillButton variant="disabled" size={buttonSize}>
                {isPanel ? "No spots remaining" : "No Spots Remaining"}
              </EventPillButton>
              {learnMore}
            </ButtonRow>
          </>
        );

      case "registered":
        return (
          <>
            <Heading
              panel={isPanel}
              icon={
                <LuCircleCheck
                  size={isPanel ? 32 : 24}
                  className={`text-primary-light flex-shrink-0 ${isPanel ? "h-[calc(32*var(--event-panel-unit,1px))] w-[calc(32*var(--event-panel-unit,1px))]" : ""}`}
                  aria-hidden="true"
                />
              }
            >
              You&apos;re signed up!
            </Heading>
            <ButtonRow>
              {registrationHref ? (
                <EventPillButton href={registrationHref} size={buttonSize}>
                  View Registration
                </EventPillButton>
              ) : (
                <EventPillButton variant="disabled" size={buttonSize}>
                  View Registration
                </EventPillButton>
              )}
              {learnMore}
            </ButtonRow>
          </>
        );

      case "concluded":
        // On the details page, the visitor is already viewing the recap, so
        // show the concluded state without another recap link.
        return onLearnMore || learnMoreHref ? (
          <EventPillButton variant="secondary" onClick={onLearnMore} href={learnMoreHref}>
            Event Concluded: View Recap
          </EventPillButton>
        ) : (
          <Heading panel={isPanel}>This event has ended</Heading>
        );
    }
  };

  // The locked and signed-up variants are tinted in Figma to stand out.
  const isTinted =
    status === "members-only-logged-out" ||
    status === "members-only-non-member" ||
    status === "registered";

  return (
    <div
      data-status={status}
      className={`flex w-full flex-col ${isPanel ? "gap-[calc(16*var(--event-panel-unit,1px))]" : "gap-[8px]"} ${
        isPanel
          ? `border-border rounded-[calc(24*var(--event-panel-unit,1px))] border p-[calc(20*var(--event-panel-unit,1px))] shadow-[0_1px_4px_0_rgba(12,12,13,0.05)] ${isTinted ? "bg-surface-faint" : "bg-white"}`
          : ""
      }`}
    >
      {renderContent()}
    </div>
  );
};

export default EventCTA;
