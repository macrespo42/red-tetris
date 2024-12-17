import globals from "globals";
import pluginJs from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
      }
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
    },
    plugins: {
      prettier: prettierPlugin,
    },
  },
  prettierConfig,
];
