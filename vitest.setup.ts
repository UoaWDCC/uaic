// Despite the package name, this is not Jest -ait  it's a DOM-matcher library
// (toBeInTheDocument(), toBeDisabled(), etc.) that plugs into Vitest's
// expect() via this /vitest entrypoint. No Jest dependency is involved.
import "@testing-library/jest-dom/vitest";
