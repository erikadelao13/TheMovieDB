import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
    "plugin:prettier/recommended"
), {
    languageOptions: {
        globals: {
            ...globals.browser,
        },

        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: "tsconfig.json",
        },
    },

    rules: {
        "prettier/prettier": "error",
    },
}];
