import { describe, expect, it } from "vitest";
import { formatEventDate } from "./formatEventDate";

describe("formatEventDate", () => {
  it("formats a same-day event in Auckland time", () => {
    expect(
      formatEventDate({
        startDate: "2050-07-20T06:00:00.000Z",
        endDate: "2050-07-20T08:00:00.000Z",
      }),
    ).toEqual({
      day: "20",
      month: "JUL",
      dateLabel: "Wed 20 Jul 2050",
      timeLabel: "6:00 PM - 8:00 PM",
    });
  });

  it("uses the Auckland date when it differs from the UTC date", () => {
    // 11:30 PM UTC on the 19th is 11:30 AM on the 20th in Auckland.
    const { day, dateLabel } = formatEventDate({
      startDate: "2050-07-19T23:30:00.000Z",
      endDate: "2050-07-20T01:00:00.000Z",
    });

    expect(day).toBe("20");
    expect(dateLabel).toBe("Wed 20 Jul 2050");
  });

  it("includes the end date for multi-day events", () => {
    expect(
      formatEventDate({
        startDate: "2050-07-20T06:00:00.000Z",
        endDate: "2050-07-21T08:00:00.000Z",
      }),
    ).toEqual({
      day: "20",
      month: "JUL",
      dateLabel: "Wed 20 Jul 2050 - Thu 21 Jul 2050",
      timeLabel: "6:00 PM - 8:00 PM",
    });
  });

  it("includes both years when a multi-day event crosses into a new year", () => {
    const { dateLabel } = formatEventDate({
      startDate: "2050-12-30T23:30:00.000Z",
      endDate: "2051-01-01T01:00:00.000Z",
    });

    expect(dateLabel).toBe("Sat 31 Dec 2050 - Sun 1 Jan 2051");
  });

  it("falls back to just the start when the end date is invalid", () => {
    const { dateLabel, timeLabel } = formatEventDate({
      startDate: "2050-07-20T06:00:00.000Z",
      endDate: "not a date",
    });

    expect(dateLabel).toBe("Wed 20 Jul 2050");
    expect(timeLabel).toBe("6:00 PM");
  });
});
