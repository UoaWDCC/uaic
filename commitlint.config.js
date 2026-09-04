// Enforces commit messages in the form: type(dir): description, e.g.
// "fix(events): correct upcoming/past toggle filter". Scope is optional
// (some commits legitimately span multiple files/dirs), and type is
// case-insensitive (FEAT/Feat/feat all accepted).
// See https://commitlint.js.org/reference/rules.html

const TYPES = [
  "build",
  "chore",
  "ci",
  "docs",
  "feat",
  "fix",
  "perf",
  "refactor",
  "revert",
  "style",
  "test",
];

module.exports = {
  extends: ["@commitlint/config-conventional"],
  plugins: [
    {
      rules: {
        "type-enum-case-insensitive": (parsed, _when, allowedTypes) => {
          const type = (parsed.type || "").toLowerCase();
          return [
            allowedTypes.includes(type),
            `type must be one of [${allowedTypes.join(", ")}] (case-insensitive)`,
          ];
        },
      },
    },
  ],
  rules: {
    // Swap the built-in case-sensitive type checks for the case-insensitive one above.
    "type-case": [0],
    "type-enum": [0],
    "type-enum-case-insensitive": [2, "always", TYPES],
  },
};
