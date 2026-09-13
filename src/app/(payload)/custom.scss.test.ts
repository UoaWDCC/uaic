// Colocated with the file it covers, per repo convention (see
// next.config.test.ts). custom.scss has no other build-time check - ESLint/
// TypeScript don't touch .scss - so this compiles it with the real Sass
// compiler and asserts on the output: brand primitives stay in sync with
// globals.css, and the namespace/cascade assumptions the override strategy
// depends on (see custom.scss's header comment) still hold.

import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import * as sass from "sass";

const SCSS_PATH = join(__dirname, "custom.scss");
const GLOBALS_CSS_PATH = join(__dirname, "..", "globals.css");

/** Pulls `--color-blue-900: #005eaf;`-style values out of globals.css's `@theme` block. */
function readGlobalsToken(name: string): string {
  const source = readFileSync(GLOBALS_CSS_PATH, "utf-8");
  const match = source.match(new RegExp(`--${name}:\\s*([^;]+);`));
  if (!match) throw new Error(`Token --${name} not found in globals.css - did it get renamed?`);
  return match[1].trim();
}

let css: string;

beforeAll(() => {
  // Throws on Sass syntax errors - nothing else compiles this file.
  css = sass.compile(SCSS_PATH).css;
});

describe("payload admin theme (custom.scss)", () => {
  it("compiles to non-empty CSS", () => {
    expect(css.length).toBeGreaterThan(0);
  });

  describe("brand primitives stay in sync with globals.css", () => {
    it.each([
      ["--uaic-blue-100", "color-blue-100"],
      ["--uaic-blue-200", "color-blue-200"],
      ["--uaic-blue-500", "color-blue-500"],
      ["--uaic-blue-900", "color-blue-900"],
      ["--uaic-ink", "color-ink"],
    ])("%s mirrors globals.css %s", (localVar, globalsToken) => {
      const expected = readGlobalsToken(globalsToken);
      const match = css.match(new RegExp(`${localVar}:\\s*([^;]+);`));
      expect(match, `${localVar} should be defined in custom.scss`).not.toBeNull();
      expect(match![1].trim()).toBe(expected);
    });

    // Same placeholder caveat as globals.css --destructive - checked
    // separately since it's not in the table above.
    it("--uaic-destructive mirrors globals.css --destructive", () => {
      const expected = readGlobalsToken("destructive");
      const match = css.match(/--uaic-destructive:\s*([^;]+);/);
      expect(match).not.toBeNull();
      expect(match![1].trim()).toBe(expected);
    });
  });

  describe("Payload accent ramp (--color-success-*) is bridged from our blue scale", () => {
    it.each([
      ["--color-success-100", "color-blue-100"],
      ["--color-success-200", "color-blue-200"],
      ["--color-success-500", "color-blue-500"],
      ["--color-success-900", "color-blue-900"],
    ])("%s equals globals.css %s exactly (pinned anchor stop)", (successVar, globalsToken) => {
      const expected = readGlobalsToken(globalsToken);
      const match = css.match(new RegExp(`${successVar}:\\s*([^;]+);`));
      expect(match).not.toBeNull();
      expect(match![1].trim()).toBe(expected);
    });

    it("defines the full 19-stop ramp Payload's colors.scss expects (50..950)", () => {
      const stops = [
        50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900,
        950,
      ];
      for (const stop of stops) {
        expect(css, `--color-success-${stop} should be defined`).toMatch(
          new RegExp(`--color-success-${stop}:`),
        );
      }
    });
  });

  describe("Payload error ramp (--color-error-*) is bridged from --destructive", () => {
    it("--color-error-500 equals globals.css --destructive exactly", () => {
      const expected = readGlobalsToken("destructive");
      const match = css.match(/--color-error-500:\s*([^;]+);/);
      expect(match).not.toBeNull();
      expect(match![1].trim()).toBe(expected);
    });

    it("defines the full 19-stop ramp Payload's colors.scss expects (50..950)", () => {
      const stops = [
        50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900,
        950,
      ];
      for (const stop of stops) {
        expect(css, `--color-error-${stop} should be defined`).toMatch(
          new RegExp(`--color-error-${stop}:`),
        );
      }
    });
  });

  describe("namespace and cascade assumptions this file's override strategy relies on", () => {
    it("never touches Payload's --color-base-*/elevation neutrals (deliberately left alone)", () => {
      expect(css).not.toMatch(/--color-base-/);
    });

    it("never touches Payload's --color-warning-* scale (not part of the brand palette)", () => {
      expect(css).not.toMatch(/--color-warning-/);
    });

    it("contains no @layer rule, so every override here stays unlayered and wins the cascade", () => {
      // Payload layers its own CSS (@layer payload-default, payload); per
      // the CSS Cascading Layers spec, unlayered rules always beat layered
      // ones regardless of specificity or source order - the mechanism this
      // file relies on instead of `!important` (see custom.scss).
      expect(css).not.toMatch(/@layer/);
    });

    it("only writes recognized Payload theme custom properties (--color-success-*/--color-error-*/--style-radius-*/--font-body/--theme-*) plus our own --uaic-* prefix in its global (:root / html[data-theme]) blocks", () => {
      // Component-scoped local vars (e.g. .btn--style-primary's --bg-color)
      // are Payload's own per-component names, not global theme namespace -
      // checked separately below.
      const globalBlocks = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
        .filter(([, selector]) => /:root|html\[data-theme/.test(selector))
        .map(([, , body]) => body);
      const declaredProps = globalBlocks.flatMap((body) =>
        [...body.matchAll(/--([a-z0-9-]+)\s*:/g)].map((m) => m[1]),
      );
      const allowed =
        /^(uaic-[a-z0-9-]+|color-success-\d+|color-error-\d+|theme-bg|theme-input-bg|theme-border-color|theme-overlay|style-radius-[sml]|font-body)$/;
      const unexpected = declaredProps.filter((p) => !allowed.test(p));
      expect(unexpected, "found a custom property outside the reviewed/documented set").toEqual([]);
    });
  });

  describe("button branding is scoped to local component variables, not global elevation tokens", () => {
    it(".btn--style-primary only overrides --bg-color/--hover-bg", () => {
      const match = css.match(/\.btn--style-primary\s*\{([^}]+)\}/);
      expect(match).not.toBeNull();
      expect(match![1].replace(/\s+/g, "")).toContain("--bg-color:var(--color-success-900)");
      expect(match![1]).toContain("--hover-bg:");
    });

    it(".btn--style-secondary only overrides its own local variables", () => {
      const match = css.match(/\.btn--style-secondary\s*\{([^}]+)\}/);
      expect(match).not.toBeNull();
      expect(match![1].replace(/\s+/g, "")).toContain("--color:var(--color-success-900)");
      expect(match![1].replace(/\s+/g, "")).toContain(
        "--btn-border:1pxsolidvar(--color-success-900)",
      );
    });
  });
});
