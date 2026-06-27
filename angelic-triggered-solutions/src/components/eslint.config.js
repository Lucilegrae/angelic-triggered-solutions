import reactPlugin from "eslint-plugin-react";
import js from "@eslint/js";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  js.configs.recommended,
  {
    files: ["**/*.jsx", "**/*.js"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react: reactPlugin,
      "unused-imports": unusedImports,
    },
    rules: {
      "no-unused-vars": "off", // disable base rule
      "unused-imports/no-unused-imports": "error", // auto-remove unused imports
      "unused-imports/no-unused-vars": [
        "warn",
        { varsIgnorePattern: "^React$", argsIgnorePattern: "^_" },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
