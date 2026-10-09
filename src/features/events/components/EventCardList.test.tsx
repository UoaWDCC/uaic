// Colocated with the component it covers - checks which clicks on an event card
// open the event and which are left to the card's own buttons and links.
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { Event } from "../../../../payload-types";
import EventCardList from "./EventCardList";

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

const renderCard = (status: "external" | "full") =>
  render(<EventCardList events={[event]} registrationStatuses={{ evt: status }} />);

describe("EventCardList card clicks", () => {
  it("opens the event from the title button, for keyboard users", () => {
    renderCard("full");
    fireEvent.click(screen.getByRole("button", { name: "Intro to Valuation Workshop" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("opens the event when the card itself is clicked", () => {
    renderCard("external");
    fireEvent.click(screen.getByText("A hands-on session covering DCFs."));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("leaves Register Now to its own link", () => {
    renderCard("external");
    fireEvent.click(screen.getByRole("link", { name: "Register Now" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("doesn't open the event from a disabled button", () => {
    renderCard("full");
    fireEvent.click(screen.getByRole("button", { name: "No Spots Remaining" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("doesn't open the event when the click ends a text selection", () => {
    renderCard("external");
    const getSelection = vi
      .spyOn(window, "getSelection")
      .mockReturnValue({ toString: () => "OGGB 260-115" } as Selection);

    fireEvent.click(screen.getByText(/OGGB 260-115/));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    getSelection.mockRestore();
  });
});

describe("EventCardList time range", () => {
  // The card always formats in NZ time, whatever timezone the server or the
  // viewer's browser is in, so these expectations are exact NZ values.
  const renderWith = (startDate: string, endDate: string) =>
    render(<EventCardList events={[{ ...event, startDate, endDate }]} />);

  it("shows just the end time for a same-day event", () => {
    renderWith("2050-03-24T00:00:00.000Z", "2050-03-24T01:00:00.000Z"); // NZDT +13
    expect(screen.getByText("1:00 PM - 2:00 PM")).toBeInTheDocument();
  });

  it("includes the end date when the event runs past its first day", () => {
    renderWith("2050-03-24T00:00:00.000Z", "2050-03-27T00:00:00.000Z");
    expect(screen.getByText("1:00 PM - 27 Mar, 1:00 PM")).toBeInTheDocument();
  });

  it("includes the year when the event ends in a later year", () => {
    renderWith("2050-03-24T00:00:00.000Z", "2051-06-15T00:00:00.000Z"); // NZST +12
    expect(screen.getByText("1:00 PM - 15 Jun 2051, 12:00 PM")).toBeInTheDocument();
  });

  it("uses the NZ calendar day, not UTC's, for the date block", () => {
    // 11:30 PM UTC on the 24th is 12:30 PM on the 25th in Auckland.
    renderWith("2050-03-24T23:30:00.000Z", "2050-03-25T01:00:00.000Z");
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("12:30 PM - 2:00 PM")).toBeInTheDocument();
  });
});
