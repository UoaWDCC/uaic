import { describe, it, expect } from "vitest";
import { isPastCutoff, resolveCancelCutoff, resolveEditCutoff } from "./eventCutoffs";

const startDate = "2026-06-10T18:00:00.000Z";
const editCutoff = "2026-06-08T18:00:00.000Z";
const cancelCutoff = "2026-06-09T18:00:00.000Z";

describe("resolveEditCutoff", () => {
  it("uses editCutoff when it is set", () => {
    expect(resolveEditCutoff({ startDate, editCutoff })).toEqual(new Date(editCutoff));
  });

  it("falls back to startDate when editCutoff is empty", () => {
    expect(resolveEditCutoff({ startDate })).toEqual(new Date(startDate));
    expect(resolveEditCutoff({ startDate, editCutoff: null })).toEqual(new Date(startDate));
  });

  it("ignores cancelCutoff", () => {
    expect(resolveEditCutoff({ startDate, cancelCutoff })).toEqual(new Date(startDate));
  });
});

describe("resolveCancelCutoff", () => {
  it("uses cancelCutoff when it is set", () => {
    expect(resolveCancelCutoff({ startDate, editCutoff, cancelCutoff })).toEqual(
      new Date(cancelCutoff),
    );
  });

  it("falls back to editCutoff, then startDate", () => {
    expect(resolveCancelCutoff({ startDate, editCutoff })).toEqual(new Date(editCutoff));
    expect(resolveCancelCutoff({ startDate })).toEqual(new Date(startDate));
  });
});

describe("isPastCutoff", () => {
  const cutoff = new Date(editCutoff);

  it("is false before and exactly at the cutoff", () => {
    expect(isPastCutoff(cutoff, new Date("2026-06-08T17:59:59.000Z"))).toBe(false);
    expect(isPastCutoff(cutoff, cutoff)).toBe(false);
  });

  it("is true after the cutoff", () => {
    expect(isPastCutoff(cutoff, new Date("2026-06-08T18:00:01.000Z"))).toBe(true);
  });
});
