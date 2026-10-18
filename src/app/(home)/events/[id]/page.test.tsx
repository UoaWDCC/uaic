import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Event } from "../../../../../payload-types";
import EventPage, { generateMetadata } from "./page";

const { getEventById, getEventRegistrationStatuses, notFound } = vi.hoisted(() => ({
  getEventById: vi.fn(),
  getEventRegistrationStatuses: vi.fn(),
  notFound: vi.fn(),
}));

vi.mock("@/features/events/data/getEvents", () => ({ getEventById }));
vi.mock("@/features/events/data/getEventRegistrationStatuses", () => ({
  getEventRegistrationStatuses,
}));
vi.mock("next/navigation", () => ({ notFound }));
vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: ({ fill: _fill, ...props }: Record<string, unknown>) => <img {...props} />,
}));

const event: Event = {
  id: "507f1f77bcf86cd799439011",
  event: "Future of ESG Investing",
  startDate: "2050-07-20T06:00:00.000Z",
  endDate: "2050-07-20T08:00:00.000Z",
  location: "OGGB Case Room 3",
  description: "Hear from the team behind New Zealand's sovereign wealth fund.",
  createdAt: "2050-07-01T00:00:00.000Z",
  updatedAt: "2050-07-01T00:00:00.000Z",
};
const props = { params: Promise.resolve({ id: event.id }) };
const notFoundError = new Error("NEXT_HTTP_ERROR_FALLBACK;404");

beforeEach(() => {
  vi.resetAllMocks();
  getEventById.mockResolvedValue(event);
  getEventRegistrationStatuses.mockResolvedValue({ [event.id]: "members-only-logged-out" });
  notFound.mockImplementation(() => {
    throw notFoundError;
  });
});

describe("EventPage", () => {
  it("awaits the route ID and renders the event with its server-provided membership status", async () => {
    render(await EventPage(props));

    expect(getEventById).toHaveBeenCalledWith(event.id);
    expect(getEventRegistrationStatuses).toHaveBeenCalledExactlyOnceWith([event]);
    expect(screen.getByRole("heading", { level: 1, name: event.event })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Become A Member" })).toHaveAttribute(
      "href",
      "/joinus",
    );
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute("href", "/login");
    expect(screen.queryByText("Learn More")).not.toBeInTheDocument();
  });

  it.each([event.id, "not-an-event-id"])(
    "uses the existing not-found boundary when the loader cannot find %s",
    async (id) => {
      getEventById.mockResolvedValue(null);

      await expect(EventPage({ params: Promise.resolve({ id }) })).rejects.toBe(notFoundError);
      expect(notFound).toHaveBeenCalledOnce();
      expect(getEventRegistrationStatuses).not.toHaveBeenCalled();
    },
  );

  it("lets database errors propagate rather than showing a misleading 404", async () => {
    const error = new Error("Database connection lost");
    getEventById.mockRejectedValue(error);

    await expect(EventPage(props)).rejects.toBe(error);
    expect(notFound).not.toHaveBeenCalled();
    expect(getEventRegistrationStatuses).not.toHaveBeenCalled();
  });

  it("generates event-specific sharing metadata, including the populated image", async () => {
    getEventById.mockResolvedValue({
      ...event,
      image: { url: "https://example.com/esg.webp", alt: "ESG investing" },
    });

    expect(await generateMetadata(props)).toEqual({
      title: `${event.event} | Investment Club`,
      description: event.description,
      openGraph: {
        title: event.event,
        description: event.description,
        type: "website",
        images: [{ url: "https://example.com/esg.webp", alt: "ESG investing" }],
      },
    });
    expect(getEventRegistrationStatuses).not.toHaveBeenCalled();
  });

  it("omits the sharing image if none is available", async () => {
    const metadata = await generateMetadata(props);
    expect(metadata.openGraph).not.toHaveProperty("images");
    expect(metadata.title).toBe(`${event.event} | Investment Club`);
  });

  it("also signals not found when generating metadata for a deleted event", async () => {
    getEventById.mockResolvedValue(null);

    await expect(generateMetadata(props)).rejects.toBe(notFoundError);
  });
});
