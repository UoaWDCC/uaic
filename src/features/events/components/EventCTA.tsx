import Link from "next/link";
import type { ReactNode } from "react";
import { LuCircleCheck, LuLock } from "react-icons/lu";
import EventPillButton from "@/features/events/components/EventPillButton";
import {
  getEventRegistrationHref,
  getEventSignInHref,
  type RegistrationStatus,
} from "@/features/events/lib/registrationStatus";

const JOIN_HREF = "/joinus";

interface EventCTAProps {
  status: RegistrationStatus;
  eventId: string;
  registrationLink?: string | null;
  className?: string;
}

// Sized in --event-unit, which the event card and details page scale with
// their own layout (1px by default).
const Heading = ({ children, icon }: { children: ReactNode; icon?: ReactNode }) => (
  <p
    className={`text-ink flex items-center gap-[calc(8*var(--event-unit))] text-[calc(20*var(--event-unit))] leading-[1.2] ${icon ? "font-medium" : "font-normal"}`}
  >
    {icon}
    {children}
  </p>
);

const Subtext = ({ children }: { children: ReactNode }) => (
  <p className="text-muted-foreground text-[calc(14*var(--event-unit))] leading-[1.428571]">
    {children}
  </p>
);

// Links to the onsite registration page. While that's switched off (see
// isOnsiteRegistrationLive) it falls back to the event's external form if it
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
  if (href)
    return (
      <EventPillButton href={href} size="panel">
        {children}
      </EventPillButton>
    );
  if (fallbackLink) {
    return (
      <EventPillButton href={fallbackLink} external size="panel">
        {children}
      </EventPillButton>
    );
  }
  return (
    <EventPillButton variant="disabled" size="panel">
      Registration Unavailable
    </EventPillButton>
  );
};

// Where a still-running event's "Signups Open" pill goes, or null once signups
// have closed (or there was never anywhere to register).
const getInProgressTarget = (
  status: "in-progress" | "in-progress-external" | "in-progress-closed",
  registrationHref: string | null,
  registrationLink?: string | null,
) => {
  if (status === "in-progress" && registrationHref)
    return { href: registrationHref, external: false };
  if (status !== "in-progress-closed" && registrationLink)
    return { href: registrationLink, external: true };
  return null;
};

// The registration call-to-action for one event, as the boxed panel from the
// Figma EventCTA component (#458). Each `status` maps to one Figma variant -
// all the deciding happens in `getRegistrationStatus`, this only renders it.
const EventCTA = ({ status, eventId, registrationLink, className = "" }: EventCTAProps) => {
  const registrationHref = getEventRegistrationHref(eventId);

  const renderContent = () => {
    switch (status) {
      case "open":
        // Figma keeps the heading on desktop. On mobile it shows only the
        // centered invitation.
        return (
          <div>
            <p className="text-ink hidden text-[calc(20*var(--event-unit))] leading-[1.2] md:block">
              Open event - no signup required
            </p>
            <p className="text-muted-foreground text-center text-[calc(20*var(--event-unit))] leading-[1.1] md:mt-[calc(4*var(--event-unit))] md:text-left md:leading-[1.2]">
              This event is open to everyone. Just show up!
            </p>
          </div>
        );

      case "external":
      case "requires-signup":
        return (
          <>
            {status === "requires-signup" && <Heading>No membership required</Heading>}
            {/* "external" never has an onsite page - its form is the link. */}
            <OnsiteButton
              href={status === "external" ? null : registrationHref}
              fallbackLink={registrationLink}
            >
              {status === "requires-signup" ? "Complete Registration" : "Register Now"}
            </OnsiteButton>
          </>
        );

      case "members-only":
        return (
          <>
            <Heading>Members only</Heading>
            <OnsiteButton href={registrationHref} fallbackLink={registrationLink}>
              Complete Registration
            </OnsiteButton>
          </>
        );

      case "members-only-logged-out":
      case "members-only-non-member":
        return (
          <div className="flex w-full flex-col gap-[calc(24*var(--event-unit))]">
            <div className="flex min-w-0 items-start gap-[calc(10*var(--event-unit))]">
              <span className="border-primary-light text-primary-light mt-[calc(2*var(--event-unit))] flex h-[calc(32*var(--event-unit))] w-[calc(32*var(--event-unit))] flex-shrink-0 items-center justify-center rounded-full border-[1.5px]">
                <LuLock
                  className="h-[calc(16*var(--event-unit))] w-[calc(16*var(--event-unit))]"
                  aria-hidden="true"
                />
              </span>
              <div className="min-w-0">
                <Heading>Members only</Heading>
                {/* Sign-in sits inline in the subtext rather than on its own
                    line under the button, so this state isn't taller than the rest. */}
                <Subtext>
                  Signup for this event requires an active membership.
                  {status === "members-only-logged-out" && (
                    <>
                      {" "}
                      Already a member?{" "}
                      <Link
                        href={getEventSignInHref(eventId)}
                        className="text-primary hover:text-primary-light underline"
                      >
                        Sign in
                      </Link>
                    </>
                  )}
                </Subtext>
              </div>
            </div>
            <EventPillButton href={JOIN_HREF} size="panel">
              Become A Member
            </EventPillButton>
          </div>
        );

      case "in-progress":
      case "in-progress-external":
      case "in-progress-closed": {
        // Same layout as "Event full". Still registerable -> a blue pill that
        // reads "Signups Open" and turns into "Register Now" on hover/focus;
        // closed (or nowhere to register) -> grey and not clickable.
        const target = getInProgressTarget(status, registrationHref, registrationLink);

        return (
          <>
            <Heading>Event in progress</Heading>
            {target ? (
              <EventPillButton
                href={target.href}
                external={target.external}
                ariaLabel="Signups open - Register Now"
                hoverLabel="Register Now"
                size="panel"
              >
                Signups Open
              </EventPillButton>
            ) : (
              <EventPillButton variant="disabled" size="panel">
                Signups Closed
              </EventPillButton>
            )}
          </>
        );
      }

      case "full":
        return (
          <>
            <Heading>Event full</Heading>
            <EventPillButton variant="disabled" size="panel">
              No spots remaining
            </EventPillButton>
          </>
        );

      case "registered":
        return (
          <>
            <Heading
              icon={
                <LuCircleCheck
                  className="text-primary-light h-[calc(32*var(--event-unit))] w-[calc(32*var(--event-unit))] flex-shrink-0"
                  aria-hidden="true"
                />
              }
            >
              You&apos;re signed up!
            </Heading>
            {registrationHref ? (
              <EventPillButton href={registrationHref} size="panel">
                View Registration
              </EventPillButton>
            ) : (
              <EventPillButton variant="disabled" size="panel">
                View Registration
              </EventPillButton>
            )}
          </>
        );

      case "concluded":
        return <Heading>This event has ended</Heading>;
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
      className={`border-border shadow-panel flex w-full flex-col gap-[calc(16*var(--event-unit))] rounded-[calc(24*var(--event-unit))] border p-[calc(20*var(--event-unit))] ${isTinted ? "bg-surface-faint" : "bg-white"} ${className}`}
    >
      {renderContent()}
    </div>
  );
};

export default EventCTA;
