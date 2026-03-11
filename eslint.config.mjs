import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js recommended rules (includes React, React Hooks, and TypeScript)
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // TypeScript parser + plugin for ts/tsx files
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      // Prefer explicit return types on exported functions
      "@typescript-eslint/explicit-module-boundary-types": "off",
      // Allow `any` with a warning rather than an error during migration
      "@typescript-eslint/no-explicit-any": "warn",
      // Unused vars: error on everything except vars prefixed with `_`
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
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
