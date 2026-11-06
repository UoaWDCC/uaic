// Colocated with the component it covers - checks which clicks on an event card
// open the event and which are left to the card's own buttons and links.
import { beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { Event } from "../../../../payload-types";
import EventCardList from "./EventCardList";
import EventsPageContent from "./EventsPageContent";
import EventsSection from "@/features/home/components/EventsSection";
import type { RegistrationStatus } from "@/features/events/lib/registrationStatus";

const { push } = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

beforeEach(() => push.mockClear());

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: ({ fill: _fill, ...props }: Record<string, unknown>) => <img {...props} />,
}));

const event = {
  id: "evt",
  event: "Intro to Valuation Workshop",
  startDate: "2050-03-24T05:00:00.000Z",
  endDate: "2050-03-24T07:00:00.000Z",
  location: "OGGB 260-115",
  description: "A hands-on session covering DCFs.",
  registrationLink: "https://forms.gle/x",
} as unknown as Event;

const renderCard = (status: RegistrationStatus) =>
  render(<EventCardList events={[event]} registrationStatuses={{ evt: status }} />);

// Suppress the browser's default navigation while still bubbling through the
// card handler. The href is checked separately; the card must not push too.
const clickLink = (link: HTMLElement) => {
  link.addEventListener("click", (clickEvent) => clickEvent.preventDefault(), { once: true });
  fireEvent.click(link.lastElementChild ?? link);
};

describe("EventCardList navigation", () => {
  it("provides title and Learn More links to the same event page", () => {
    renderCard("external");

    for (const name of [event.event, "Learn More"]) {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("href", "/events/evt");
      clickLink(link);
    }

    expect(push).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("keeps title and Learn More links for locked events", () => {
    renderCard("members-only-logged-out");
    for (const name of [event.event, "Learn More"]) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", "/events/evt");
    }
  });

  it("navigates to the clicked card's own page without opening a dialog", () => {
    const secondEvent = {
      ...event,
      id: "second",
      event: "Second event",
      location: "Another room",
    };
    render(<EventCardList events={[event, secondEvent]} />);

    fireEvent.click(screen.getByText(secondEvent.location));

    expect(push).toHaveBeenCalledExactlyOnceWith("/events/second");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("links past events and whole-card clicks to the event page", () => {
    render(<EventCardList events={[event]} isPast />);
    expect(screen.getByText("This event has ended")).toBeInTheDocument();
    const learnMore = screen.getByRole("link", { name: "Learn More" });
    expect(learnMore).toHaveAttribute("href", "/events/evt");
    clickLink(learnMore);
    expect(push).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText(event.location));
    expect(push).toHaveBeenCalledExactlyOnceWith("/events/evt");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it.each([
    ["external", "Register Now", "https://forms.gle/x"],
    ["members-only-logged-out", "Become A Member", "/joinus"],
    ["members-only-logged-out", "Sign in", "/login"],
  ] as const)("preserves the %s %s destination", (status, name, href) => {
    renderCard(status);
    const link = screen.getByRole("link", { name });
    expect(link).toHaveAttribute("href", href);
    if (status === "external") {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }

    clickLink(link);

    expect(push).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it.each([
    ["full", "No spots remaining"],
    ["registered", "View Registration"],
    ["requires-signup", "Registration Unavailable"],
  ] as const)("doesn't navigate from a disabled %s action", (status, name) => {
    render(
      <EventCardList
        events={[{ ...event, registrationLink: null }]}
        registrationStatuses={{ evt: status }}
      />,
    );
    const button = screen.getByRole("button", { name });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    // A child of a disabled button can still bubble a click to the card.
    fireEvent.click(screen.getByText(name));
    expect(push).not.toHaveBeenCalled();
  });

  it("doesn't navigate when the click ends a text selection", () => {
    renderCard("external");
    const getSelection = vi
      .spyOn(window, "getSelection")
      .mockReturnValue({ toString: () => "OGGB 260-115" } as Selection);

    try {
      fireEvent.click(screen.getByText(/OGGB 260-115/));
      expect(push).not.toHaveBeenCalled();
    } finally {
      getSelection.mockRestore();
    }
  });
});

describe("event card callers", () => {
  it("uses dedicated event links in both listing tabs", () => {
    const pastEvent = { ...event, id: "past", event: "Past workshop" };
    render(
      <EventsPageContent
        upcomingEvents={[event]}
        pastEvents={[pastEvent]}
        registrationStatuses={{ evt: "external", past: "concluded" }}
      />,
    );
    expect(screen.getByRole("link", { name: "Learn More" })).toHaveAttribute("href", "/events/evt");

    fireEvent.click(screen.getByRole("button", { name: "View Past Events" }));

    expect(screen.getByRole("link", { name: pastEvent.event })).toHaveAttribute(
      "href",
      "/events/past",
    );
    expect(screen.getByRole("link", { name: "Learn More" })).toHaveAttribute(
      "href",
      "/events/past",
    );
    fireEvent.click(screen.getByText(pastEvent.location));
    expect(push).toHaveBeenCalledExactlyOnceWith("/events/past");
  });

  it.each(["external", "concluded"] as const)(
    "uses dedicated event links in the homepage's %s section",
    (status) => {
      render(<EventsSection events={[event]} registrationStatuses={{ evt: status }} />);
      expect(screen.getByRole("link", { name: event.event })).toHaveAttribute(
        "href",
        "/events/evt",
      );
      expect(screen.getByRole("link", { name: "Learn More" })).toHaveAttribute(
        "href",
        "/events/evt",
      );
      fireEvent.click(screen.getByText(event.location));
      expect(push).toHaveBeenCalledExactlyOnceWith("/events/evt");
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    },
  );
});

describe("EventCardList time range", () => {
  // The card always formats in NZ time, whatever timezone the server or the
  // viewer's browser is in, so these expectations are exact NZ values.
  const renderWith = (startDate: string, endDate: string) =>
    render(<EventCardList events={[{ ...event, startDate, endDate }]} />);

  it("shows the date and time range for a same-day event", () => {
    renderWith("2050-03-24T00:00:00.000Z", "2050-03-24T01:00:00.000Z"); // NZDT +13
    expect(screen.getByText("Thu 24 Mar 2050")).toBeInTheDocument();
    expect(screen.getByText("1:00 PM - 2:00 PM")).toBeInTheDocument();
  });

  it("shows both dates when the event runs past its first day", () => {
    renderWith("2050-03-24T00:00:00.000Z", "2051-06-15T00:00:00.000Z"); // NZST +12
    expect(screen.getByText("Thu 24 Mar 2050 - Thu 15 Jun 2051")).toBeInTheDocument();
    expect(screen.getByText("1:00 PM - 12:00 PM")).toBeInTheDocument();
  });

  it("uses the NZ calendar day, not UTC's", () => {
    // 11:30 PM UTC on the 24th is 12:30 PM on the 25th in Auckland.
    renderWith("2050-03-24T23:30:00.000Z", "2050-03-25T01:00:00.000Z");
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("Fri 25 Mar 2050")).toBeInTheDocument();
  });
});
