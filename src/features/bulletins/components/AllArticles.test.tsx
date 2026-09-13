// Colocated with the component it covers - tests live next to their source
// as `*.test.ts(x)`, rather than in a separate mirrored folder. This is the
// "unit test" tier: a plain function, no rendering, no DB.
import { describe, it, expect } from "vitest";
import { getPageItems, ELLIPSIS } from "./AllArticles";

describe("getPageItems", () => {
  it("returns every page when totalPages is 7 or fewer", () => {
    expect(getPageItems(5, 1)).toEqual([1, 2, 3, 4, 5]);
  });

  it("returns a single page unchanged", () => {
    expect(getPageItems(1, 1)).toEqual([1]);
  });

  it("windows around the current page with ellipses on both sides", () => {
    expect(getPageItems(20, 10)).toEqual([1, ELLIPSIS, 9, 10, 11, ELLIPSIS, 20]);
  });

  it("only shows a trailing ellipsis when the current page is near the start", () => {
    expect(getPageItems(20, 2)).toEqual([1, 2, 3, ELLIPSIS, 20]);
  });

  it("only shows a leading ellipsis when the current page is near the end", () => {
    expect(getPageItems(20, 19)).toEqual([1, ELLIPSIS, 18, 19, 20]);
  });
});
