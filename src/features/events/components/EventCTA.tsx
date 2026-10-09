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

const Heading = ({ children, icon }: { children: ReactNode; icon?: ReactNode }) => (
  <p className="text-ink flex items-center gap-[8px] text-[18px] leading-[24px] font-medium">
    {icon}
    {children}
  </p>
);

const Subtext = ({ children }: { children: ReactNode }) => (
  <p className="text-muted-foreground text-[14px] leading-[20px]">{children}</p>
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
}: {
  href: string | null;
  fallbackLink?: string | null;
  children: ReactNode;
}) => {
  if (href) return <EventPillButton href={href}>{children}</EventPillButton>;
  if (fallbackLink) {
    return (
      <EventPillButton href={fallbackLink} external>
        {children}
      </EventPillButton>
    );
  }
  return <EventPillButton variant="disabled">Registration Unavailable</EventPillButton>;
};

const ButtonRow = ({ children }: { children: ReactNode }) => (
  <div className="sm:gap-comfortable flex w-full flex-col items-stretch gap-[10px] sm:flex-row">
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

  const learnMore =
    onLearnMore || learnMoreHref ? (
      <EventPillButton variant="secondary" onClick={onLearnMore} href={learnMoreHref}>
        Learn More
      </EventPillButton>
    ) : null;

  const renderContent = () => {
    switch (status) {
      case "open":
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
            {isPanel && status === "requires-signup" && <Heading>No membership required</Heading>}
            <ButtonRow>
              {/* "external" never has an onsite page - its form is the link. */}
              <OnsiteButton
                href={status === "external" ? null : registrationHref}
                fallbackLink={registrationLink}
              >
                Register Now
              </OnsiteButton>
              {learnMore}
            </ButtonRow>
          </>
        );

      case "members-only":
        return (
          <>
            <Heading>Members only</Heading>
            <ButtonRow>
              <OnsiteButton href={registrationHref} fallbackLink={registrationLink}>
                Register Now
              </OnsiteButton>
              {learnMore}
            </ButtonRow>
          </>
        );

      case "members-only-logged-out":
      case "members-only-non-member":
        return (
          <div
            className={`gap-comfortable flex w-full flex-col ${isPanel ? "" : "lg:flex-row lg:items-end"}`}
          >
            <div className="flex min-w-0 items-start gap-[10px] lg:flex-1">
              <span className="border-primary-light text-primary-light mt-[2px] flex h-[24px] w-[24px] flex-shrink-0 items-center justify-center rounded-full border-[1.5px]">
                <LuLock size={12} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <Heading>Members only</Heading>
                <Subtext>Signup for this event requires an active membership.</Subtext>
              </div>
            </div>
            <div className="flex flex-col items-stretch gap-[8px] lg:flex-1">
              <EventPillButton href={JOIN_HREF}>Join to Register</EventPillButton>
              {status === "members-only-logged-out" && (
                <p className="text-muted-foreground text-center text-[12px]">
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
            <Heading>Event in progress</Heading>
            <ButtonRow>
              {target ? (
                <EventPillButton
                  href={target.href}
                  external={target.external}
                  ariaLabel="Signups open - Register Now"
                  hoverLabel="Register Now"
                >
                  Signups Open
                </EventPillButton>
              ) : (
                <EventPillButton variant="disabled">Signups Closed</EventPillButton>
              )}
              {learnMore}
            </ButtonRow>
          </>
        );
      }

      case "full":
        return (
          <>
            <Heading>Event full</Heading>
            <ButtonRow>
              <EventPillButton variant="disabled">No Spots Remaining</EventPillButton>
              {learnMore}
            </ButtonRow>
          </>
        );

      case "registered":
        return (
          <>
            <Heading
              icon={
                <LuCircleCheck
                  size={24}
                  className="text-primary-light flex-shrink-0"
                  aria-hidden="true"
                />
              }
            >
              You&apos;re signed up!
            </Heading>
            <ButtonRow>
              {registrationHref ? (
                <EventPillButton href={registrationHref}>View Registration</EventPillButton>
              ) : (
                <EventPillButton variant="disabled">View Registration</EventPillButton>
              )}
              {learnMore}
            </ButtonRow>
          </>
        );

      case "concluded":
        // With nowhere to send "View Recap" (e.g. inside the event modal, which
        // is the recap), just say it's over rather than show a dead button.
        return onLearnMore || learnMoreHref ? (
          <EventPillButton variant="secondary" onClick={onLearnMore} href={learnMoreHref}>
            Event Concluded: View Recap
          </EventPillButton>
        ) : (
          <Heading>This event has ended</Heading>
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
      className={`flex w-full flex-col gap-[8px] ${
        isPanel
          ? `border-border rounded-[24px] border p-[24px] ${isTinted ? "bg-surface-faint" : "bg-white"}`
          : ""
      }`}
    >
      {renderContent()}
    </div>
  );
};

export default EventCTA;
