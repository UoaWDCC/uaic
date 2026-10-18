// Colocated with the component it covers - checks the date badge and time are
// always read in NZ time, and that bad dates fall back instead of throwing.
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Event } from "../../../../payload-types";
import EventSummary from "./EventSummary";

const event = {
  event: "Intro to Valuation Workshop",
  startDate: "2026-10-31T20:00:00.000Z", // 9:00 AM, 1 Nov NZDT (+13)
  endDate: "2026-10-31T22:00:00.000Z",
  location: "OGGB 260-115",
} as Pick<Event, "event" | "startDate" | "endDate" | "location">;

const renderWith = (overrides: Partial<typeof event> = {}) =>
  render(<EventSummary event={{ ...event, ...overrides }} />);

// The time and location share one line, so match against the whole line.
const getSubtitle = () => screen.getByText(event.location, { exact: false });

describe("EventSummary date badge", () => {
  it("uses the NZ calendar day, not UTC's", () => {
    // 8 PM UTC on 31 Oct is already 1 Nov in Auckland.
    renderWith();
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("NOV")).toBeInTheDocument();
  });

  it("exposes the exact start time to assistive tech", () => {
    const { container } = renderWith();
    expect(container.querySelector("time")).toHaveAttribute("dateTime", event.startDate);
  });

  it("labels September as SEP, not en-NZ's Sept", () => {
    renderWith({ startDate: "2026-09-15T00:00:00.000Z", endDate: "2026-09-15T01:00:00.000Z" });
    expect(screen.getByText("SEP")).toBeInTheDocument();
  });
});

describe("EventSummary time and location", () => {
  it("shows the NZ time range before the location", () => {
    renderWith();
    expect(getSubtitle()).toHaveTextContent("9:00 AM - 11:00 AM • OGGB 260-115");
  });

  it("shows midnight as 12:00 AM", () => {
    // Midnight 15 Sep NZST (+12).
    renderWith({ startDate: "2026-09-14T12:00:00.000Z", endDate: "2026-09-14T14:00:00.000Z" });
    expect(getSubtitle()).toHaveTextContent("12:00 AM - 2:00 AM");
  });

  it("hides the bullet separator from screen readers", () => {
    renderWith();
    expect(screen.getByText("•")).toHaveAttribute("aria-hidden");
  });

  it("shows just the start time when the end date is invalid", () => {
    renderWith({ endDate: "not a date" });
    expect(getSubtitle()).toHaveTextContent("9:00 AM • OGGB 260-115");
  });

  it("drops the badge and time when the start date is invalid", () => {
    const { container } = renderWith({ startDate: "not a date" });
    expect(container.querySelector("time")).not.toBeInTheDocument();
    expect(getSubtitle()).toHaveTextContent(/^OGGB 260-115$/);
  });
});
