// Regenerates payload-types.ts from the current collection/global config.
//
// Can't just run `payload generate:types` - Payload's CLI (node_modules/payload/bin.js)
// bootstraps tsx from a plain Node entrypoint and only registers its ESM loader hooks
// afterward via `tsImport()`. By the time payload.config.ts pulls in
// @payloadcms/richtext-lexical (which has top-level await in its ESM build), tsx falls
// back to a synchronous CJS `require()` for it, and Node refuses to load a top-level-await
// module that way: `ERR_REQUIRE_ASYNC_MODULE`. This reproduces regardless of Node version
// (tried 22.14.0 and 23.10.0) or tsx version (tried 4.22.4 and 4.23.13).
//
// Running *this* file through the `tsx` CLI instead sidesteps it entirely: tsx registers
// its loader hooks before anything else loads, so payload.config.ts (and everything it
// imports) goes through tsx's proper async ESM path from the start. We then call Payload's
// own CLI `bin()` function directly instead of going through its bin.js wrapper.
import { pathToFileURL } from "node:url";
import path from "node:path";

// A bare "payload/dist/bin/index.js" specifier fails - that subpath isn't
// exposed in payload's package.json "exports" map. Resolving the file path
// ourselves and importing it by URL bypasses that restriction the same way
// payload's own bin.js does internally.
const binEntry = pathToFileURL(
  path.resolve(process.cwd(), "node_modules/payload/dist/bin/index.js"),
);
const { bin } = await import(binEntry.href);
process.argv = [process.argv[0], process.argv[1], "generate:types"];
await bin();
