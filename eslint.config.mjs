import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Technical articles contain literal quotes and apostrophes in JSX prose.
      // Escaping every occurrence makes the source harder to maintain without
      // changing rendered output.
      "react/no-unescaped-entities": "off",
      // These tools intentionally synchronize browser-only derived UI state
      // such as copied flags, timers, generated QR/SVG output, and validation
      // messages from effects. The production build still type-checks them.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
