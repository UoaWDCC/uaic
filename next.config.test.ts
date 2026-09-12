// Colocated with the config it covers - tests live next to their source
// as `*.test.ts(x)`, rather than in a separate mirrored folder.
//
// `next/image` only checks a local `src` against `images.localPatterns` at
// render/request time, not at `pnpm build` - a page can prerender fine and
// still 500 the first time someone visits it in a browser. This test scans
// for every hardcoded local `<Image src="...">` in the codebase and runs it
// through Next's own matcher, so a path added outside `localPatterns` fails
// here instead of in someone's browser.

import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join, extname } from "node:path";

// Reaches into Next's internals: there's no public API for this check, and
// this is the exact function `next/image` calls at request time (see
// node_modules/next/dist/shared/lib/match-local-pattern.js). Next's
// package.json has no "exports" map restricting subpath imports, so this
// resolves like any other deep import - if a future Next upgrade adds one
// or moves the file, this import (not a false sense of security) breaks.

import { hasLocalMatch } from "next/dist/shared/lib/match-local-pattern";
import ts from "typescript";
import nextConfig from "./next.config";

const SRC_DIR = join(__dirname, "src");

function collectTsxFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) return collectTsxFiles(fullPath);
    return extname(entry.name) === ".tsx" ? [fullPath] : [];
  });
}

function getNextImageLocalName(sourceFile: ts.SourceFile): string | undefined {
  let localName: string | undefined;
  sourceFile.forEachChild((node) => {
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier) &&
      node.moduleSpecifier.text === "next/image" &&
      node.importClause?.name
    ) {
      localName = node.importClause.name.text;
    }
  });
  return localName;
}

// Only literal `src` values can be checked statically - dynamic ones (e.g.
// Payload-backed `src={imageUrl}`) are skipped, since they're not knowable
// without running the app.
function findLocalImageSrcLiterals(filePath: string): string[] {
  const sourceFile = ts.createSourceFile(
    filePath,
    readFileSync(filePath, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  const imageLocalName = getNextImageLocalName(sourceFile);
  if (!imageLocalName) return [];

  const literals: string[] = [];

  function visit(node: ts.Node) {
    if (
      ts.isJsxOpeningLikeElement(node) &&
      ts.isIdentifier(node.tagName) &&
      node.tagName.text === imageLocalName
    ) {
      for (const attr of node.attributes.properties) {
        if (
          !ts.isJsxAttribute(attr) ||
          !ts.isIdentifier(attr.name) ||
          attr.name.text !== "src" ||
          !attr.initializer
        )
          continue;

        const valueNode = ts.isJsxExpression(attr.initializer)
          ? attr.initializer.expression
          : attr.initializer;

        if (valueNode && ts.isStringLiteralLike(valueNode) && valueNode.text.startsWith("/")) {
          literals.push(valueNode.text);
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return literals;
}

describe("next/image local src paths", () => {
  const localPatterns = nextConfig.images?.localPatterns;
  const filesWithLiterals = collectTsxFiles(SRC_DIR)
    .map((file) => ({ file, srcs: findLocalImageSrcLiterals(file) }))
    .filter(({ srcs }) => srcs.length > 0);

  it("found at least one hardcoded local <Image src> to check (sanity check for the scan itself)", () => {
    expect(filesWithLiterals.length).toBeGreaterThan(0);
  });

  for (const { file, srcs } of filesWithLiterals) {
    for (const src of srcs) {
      it(`${src} (${file.replace(SRC_DIR, "src")}) matches images.localPatterns in next.config.ts`, () => {
        expect(hasLocalMatch(localPatterns, src)).toBe(true);
      });
    }
  }
});
