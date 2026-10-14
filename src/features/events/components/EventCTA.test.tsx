// Colocated with the component it covers - renders each status and checks the
// CTA a viewer actually gets. No DB: status is passed in directly.
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EventCTA from "./EventCTA";

describe("EventCTA", () => {
  it("disables onsite Register Now until the registration page exists", () => {
    render(<EventCTA status="requires-signup" eventId="abc" />);
    expect(screen.queryByRole("link", { name: "Register Now" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Registration Unavailable" })).toBeDisabled();
  });

  it("falls back to the external form for onsite-signup events that have one", () => {
    render(<EventCTA status="members-only" eventId="abc" registrationLink="https://forms.gle/x" />);
    const link = screen.getByRole("link", { name: "Register Now" });
    expect(link).toHaveAttribute("href", "https://forms.gle/x");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("opens external registration links in a new tab", () => {
    render(<EventCTA status="external" eventId="abc" registrationLink="https://forms.gle/x" />);
    const link = screen.getByRole("link", { name: "Register Now" });
    expect(link).toHaveAttribute("href", "https://forms.gle/x");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("doesn't render a broken link if an external event has no link", () => {
    render(<EventCTA status="external" eventId="abc" registrationLink={null} />);
    expect(screen.queryByRole("link", { name: "Register Now" })).not.toBeInTheDocument();
  });

  it("sends logged-out viewers of members-only events to join, with a sign-in prompt", () => {
    render(<EventCTA status="members-only-logged-out" eventId="abc" />);
    expect(screen.getByRole("link", { name: "Join to Register" })).toHaveAttribute(
      "href",
      "/joinus",
    );
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute("href", "/login");
  });

  it("doesn't offer sign-in to someone who's already logged in", () => {
    render(<EventCTA status="members-only-non-member" eventId="abc" />);
    expect(screen.queryByRole("link", { name: "Sign in" })).not.toBeInTheDocument();
  });

  it("shows a disabled button when the event is full", () => {
    render(<EventCTA status="full" eventId="abc" />);
    expect(screen.getByText("Event full")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "No Spots Remaining" })).toBeDisabled();
  });

  it("confirms a registration without linking to the missing registration page", () => {
    render(<EventCTA status="registered" eventId="abc" />);
    expect(screen.getByText("You're signed up!")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "View Registration" })).toBeDisabled();
  });

  it("calls onLearnMore from both Learn More and the concluded recap button", () => {
    const onLearnMore = vi.fn();
    const { rerender } = render(
      <EventCTA status="registered" eventId="abc" onLearnMore={onLearnMore} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Learn More" }));

    rerender(<EventCTA status="concluded" eventId="abc" onLearnMore={onLearnMore} />);
    fireEvent.click(screen.getByRole("button", { name: "Event Concluded: View Recap" }));

    expect(onLearnMore).toHaveBeenCalledTimes(2);
  });

  it("says a concluded event has ended when there's no recap to link to", () => {
    render(<EventCTA status="concluded" eventId="abc" layout="panel" />);
    expect(screen.getByText("This event has ended")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("hides Learn More when there's nowhere for it to go", () => {
    render(<EventCTA status="members-only" eventId="abc" layout="panel" />);
    expect(screen.queryByText("Learn More")).not.toBeInTheDocument();
  });

  it("tints the panel only for the locked and signed-up variants", () => {
    const tinted = (status: Parameters<typeof EventCTA>[0]["status"]) => {
      const { container, unmount } = render(
        <EventCTA status={status} eventId="abc" layout="panel" />,
      );
      const isTinted = (container.firstChild as HTMLElement).classList.contains("bg-surface-faint");
      unmount();
      return isTinted;
    };

    expect(tinted("registered")).toBe(true);
    expect(tinted("members-only-logged-out")).toBe(true);
    expect(tinted("full")).toBe(false);
    expect(tinted("requires-signup")).toBe(false);
  });

  it("lets people register for an in-progress event that's still open", () => {
    render(
      <EventCTA
        status="in-progress-external"
        eventId="abc"
        registrationLink="https://forms.gle/x"
      />,
    );
    expect(screen.getByText("Event in progress")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Signups open - Register Now" });
    expect(link).toHaveAttribute("href", "https://forms.gle/x");
    expect(link).toHaveTextContent("Signups Open");
  });

  it("greys out an in-progress event once registration has closed", () => {
    render(<EventCTA status="in-progress-closed" eventId="abc" registrationLink="https://x.y" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Signups Closed" })).toBeDisabled();
  });

  it("greys out an onsite in-progress event with nowhere to register yet", () => {
    render(<EventCTA status="in-progress" eventId="abc" />);
    expect(screen.getByRole("button", { name: "Signups Closed" })).toBeDisabled();
  });
});
