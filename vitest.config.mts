import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // @vitejs/plugin-react transforms JSX itself (via Babel), so it isn't
  // affected by tsconfig.json's jsx: "preserve" (needed for Next.js's own
  // SWC transform) the way Vite's built-in esbuild transform is.
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    passWithNoTests: true,
  },
});
