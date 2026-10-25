import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Event } from "../../../../payload-types";
import EventDetails from "./EventDetails";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: ({ fill: _fill, ...props }: Record<string, unknown>) => <img {...props} />,
}));

const event = {
  id: "507f1f77bcf86cd799439011",
  event: "Panel Discussion: Future of ESG Investing",
  startDate: "2050-07-20T06:00:00.000Z",
  endDate: "2050-07-20T08:00:00.000Z",
  location: "OGGB Case Room 3",
  description: "Connect with the team behind New Zealand's sovereign wealth fund.\nAll welcome.",
  image: {
    id: "507f1f77bcf86cd799439012",
    alt: "Investing on a phone",
    url: "https://example.com/event.webp",
    createdAt: "2050-07-01T00:00:00.000Z",
    updatedAt: "2050-07-01T00:00:00.000Z",
  },
  createdAt: "2050-07-01T00:00:00.000Z",
  updatedAt: "2050-07-01T00:00:00.000Z",
} satisfies Event;

describe("EventDetails", () => {
  it("renders the full event with its image, Auckland date/time and a way back to events", () => {
    render(<EventDetails event={event} registrationStatus="open" />);

    expect(screen.getByRole("heading", { level: 1, name: event.event })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Investing on a phone" })).toHaveAttribute(
      "src",
      "https://example.com/event.webp",
    );
    expect(screen.getByText("Wed 20 Jul 2050")).toHaveAttribute("dateTime", event.startDate);
    expect(screen.getByText("6:00 PM - 8:00 PM")).toBeInTheDocument();
    expect(screen.getByText(event.location)).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "About this event" })).toHaveTextContent(
      event.description.replace("\n", " "),
    );
    expect(screen.queryByText("Event Info")).not.toBeInTheDocument();
    expect(screen.getByText("JUL")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to events" })).toHaveAttribute("href", "/events");
    expect(screen.queryByText("Learn More")).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it.each([undefined, null, "unpopulated-image-id", { ...event.image, url: null }])(
    "uses the club logo when the image has no populated URL (%j)",
    (image) => {
      render(<EventDetails event={{ ...event, image }} registrationStatus="open" />);
      expect(screen.getByRole("img")).toHaveAttribute("src", "/assets/logos/uaic.webp");
    },
  );

  it("uses the server-provided status even when raw event fields would allow registration", () => {
    render(
      <EventDetails
        event={{ ...event, requiresSignup: false, registrationLink: "https://forms.gle/x" }}
        registrationStatus="full"
      />,
    );

    expect(screen.getByText("Event full")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "No spots remaining" })).toBeDisabled();
    expect(screen.queryByRole("link", { name: /register/i })).not.toBeInTheDocument();
    expect(screen.queryByText("Learn More")).not.toBeInTheDocument();
    expect(document.querySelector("form")).not.toBeInTheDocument();
  });

  it("shows the full start and end dates in the text for multi-day events", () => {
    render(
      <EventDetails
        event={{
          ...event,
          startDate: "2050-12-30T23:30:00.000Z",
          endDate: "2051-01-01T01:00:00.000Z",
        }}
        registrationStatus="open"
      />,
    );

    expect(screen.getByText("Sat 31 Dec 2050 - Sun 1 Jan 2051")).toBeInTheDocument();
    expect(screen.getByText("12:30 PM - 2:00 PM")).toBeInTheDocument();
  });
});
