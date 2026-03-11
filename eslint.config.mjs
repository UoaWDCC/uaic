import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = [
  // Next.js recommended rules (includes React, React Hooks, and TypeScript)
  // eslint-config-next 16.x exports flat config arrays directly
  ...nextCoreWebVitals,
  ...nextTypescript,

  // Custom TypeScript rules layered on top of next/typescript
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Allow `any` with a warning rather than a hard error during migration
      "@typescript-eslint/no-explicit-any": "warn",
      // Unused vars: error, but ignore names prefixed with `_`
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // React content sites have lots of English prose with apostrophes;
      // escaping them to &apos; everywhere hurts readability.
      "react/no-unescaped-entities": "off",
    },
  },

  // Prettier integration — must come AFTER other style rules so it wins
  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },

  // Files / directories to ignore entirely
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "dist/**",
      "build/**",
      "src/app/(payload)/admin/importMap.js",
      "payload-types.ts",
    ],
  },
];

export default eslintConfig;
