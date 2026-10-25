// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Event } from "../../../../payload-types";
import { getEventById } from "./getEvents";

const { getPayload, findByID } = vi.hoisted(() => ({
  getPayload: vi.fn(),
  findByID: vi.fn(),
}));

vi.mock("payload", () => ({ getPayload }));
vi.mock("@payload-config", () => ({ default: {} }));
vi.mock("server-only", () => ({}));

const event: Event = {
  id: "507f1f77bcf86cd799439011",
  event: "Panel Discussion: Future of ESG Investing",
  startDate: "2050-07-20T06:00:00.000Z",
  endDate: "2050-07-20T08:00:00.000Z",
  location: "OGGB Case Room 3",
  description: "Connect with the team behind New Zealand's sovereign wealth fund.",
  image: {
    id: "507f1f77bcf86cd799439012",
    alt: "Investing",
    url: "https://example.com/event.webp",
    createdAt: "2050-07-01T00:00:00.000Z",
    updatedAt: "2050-07-01T00:00:00.000Z",
  },
  createdAt: "2050-07-01T00:00:00.000Z",
  updatedAt: "2050-07-01T00:00:00.000Z",
};

beforeEach(() => {
  vi.resetAllMocks();
  getPayload.mockResolvedValue({ findByID });
  findByID.mockResolvedValue(event);
});

describe("getEventById", () => {
  it("fetches the requested event with its image and respects public read access", async () => {
    expect(await getEventById(event.id)).toEqual(event);
    expect(findByID).toHaveBeenCalledExactlyOnceWith({
      collection: "events",
      id: event.id,
      depth: 1,
      overrideAccess: false,
      disableErrors: true,
    });
  });

  it("returns null for an unknown or deleted event", async () => {
    findByID.mockResolvedValue(null);

    expect(await getEventById(event.id)).toBeNull();
  });

  it.each([
    "",
    "not-an-event-id",
    "507f1f77bcf86cd79943901",
    "507f1f77bcf86cd7994390110",
    "507f1f77bcf86cd79943901g",
    " 507f1f77bcf86cd799439011",
  ])("returns null for malformed ID %j without initializing Payload", async (id) => {
    expect(await getEventById(id)).toBeNull();
    expect(getPayload).not.toHaveBeenCalled();
    expect(findByID).not.toHaveBeenCalled();
  });

  it("accepts uppercase hexadecimal ObjectIDs", async () => {
    const id = event.id.toUpperCase();

    expect(await getEventById(id)).toEqual(event);
    expect(findByID).toHaveBeenCalledWith(expect.objectContaining({ id }));
  });

  it("propagates database query failures instead of returning null", async () => {
    const error = new Error("Database connection lost");
    findByID.mockRejectedValue(error);

    await expect(getEventById(event.id)).rejects.toBe(error);
  });

  it("propagates Payload initialization failures instead of returning null", async () => {
    const error = new Error("Payload initialization failed");
    getPayload.mockRejectedValue(error);

    await expect(getEventById(event.id)).rejects.toBe(error);
    expect(findByID).not.toHaveBeenCalled();
  });
});
