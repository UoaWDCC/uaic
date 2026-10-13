import Link from "next/link";
import type { ReactNode } from "react";
import RegistrationShell from "@/components/RegistrationShell";
import EventPillButton from "@/features/events/components/EventPillButton";
import type { RegistrationStatus } from "@/features/events/lib/registrationStatus";

const MESSAGES: Partial<Record<RegistrationStatus, { heading: string; body: string }>> = {
  full: { heading: "Event full", body: "There are no spots remaining for this event." },
  registered: { heading: "You're signed up!", body: "You're already registered for this event." },
  concluded: { heading: "This event has ended", body: "Registration for this event is closed." },
  "in-progress-closed": {
    heading: "Registration closed",
    body: "This event has started and is no longer taking registrations.",
  },
  "members-only-logged-out": {
    heading: "Members only",
    body: "Signup for this event requires an active membership.",
  },
  "members-only-non-member": {
    heading: "Members only",
    body: "Signup for this event requires an active membership.",
  },
};

// Open and external-link events have no onsite signup to show.
const FALLBACK = {
  heading: "Registration unavailable",
  body: "This event doesn't take registrations here.",
};

// Shown in place of the form for any status that can't take a signup.
export default function RegistrationUnavailable({
  status,
  header,
}: {
  status: RegistrationStatus;
  header: ReactNode;
}) {
  const { heading, body } = MESSAGES[status] ?? FALLBACK;
  const isLocked = status === "members-only-logged-out" || status === "members-only-non-member";

  return (
    <RegistrationShell header={header}>
      <div role="status" className="flex flex-col gap-2">
        <p className="text-[18px] font-medium">{heading}</p>
        <p className="text-muted-foreground">{body}</p>
      </div>
      <div className="mt-auto flex flex-col gap-3">
        {isLocked ? (
          <>
            <EventPillButton href="/joinus">Join to Register</EventPillButton>
            {status === "members-only-logged-out" && (
              <p className="text-muted-foreground text-center text-[12px]">
                Already a member?{" "}
                <Link href="/login" className="text-primary hover:text-primary-light underline">
                  Sign in
                </Link>
              </p>
            )}
          </>
        ) : (
          <EventPillButton href="/events" variant="secondary">
            Back to Events
          </EventPillButton>
        )}
      </div>
    </RegistrationShell>
  );
}
