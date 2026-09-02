import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// vite and @vitejs/plugin-react are pinned to the 7.x line in package.json
// (not just left to float on ^8) because Vite 8 made Rolldown its default
// bundler, and Rolldown's native binding resolution is currently broken
// under pnpm on Linux CI - a real, open, unresolved upstream bug as of
// writing: https://github.com/rolldown/rolldown/issues/9068. Once that's
// fixed, both pins (and the vite-tsconfig-paths plugin below, which exists
// only because Vite 7 lacks Vite 8's native resolve.tsconfigPaths) can be
// revisited.
export default defineConfig({
  plugins: [
    // Transforms JSX itself (via Babel), so it isn't affected by
    // tsconfig.json's jsx: "preserve" (needed for Next.js's own SWC
    // transform) the way Vite's built-in esbuild transform is.
    react(),
    // Resolves @/* and @payload-config from tsconfig.json's "paths".
    tsconfigPaths(),
  ],
  test: {
    // jsdom is pinned to 26.1.0 in package.json (not left on ^30) because
    // jsdom 27+ pulls in html-encoding-sniffer@6 -> @exodus/bytes, an
    // ESM-only package with top-level await that its own CJS require()
    // can't load - breaks vitest's worker startup outright. Passed locally
    // (same resolved versions as CI, so this isn't a stale-install thing -
    // seemingly Node-version-sensitive; CI runs Node 24) but failed in CI's
    // clean-install run. Known upstream regression, no fix yet as of
    // writing: https://github.com/vitest-dev/vitest/issues/9281
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    passWithNoTests: true,
  },
});
