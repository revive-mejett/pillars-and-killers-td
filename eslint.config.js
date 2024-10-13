import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
    { files: ["**/*.{js,mjs,cjs,ts}"] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        "rules": {
            "quotes": ["warn", "double"],       // Enforce double quotes
            "no-unused-vars": "warn",            // Warn about unused variables
            "eqeqeq": ["warn", "always"],       // Enforce strict equality (===)
            "no-console": "off",                 // Allow console.log statements
            "indent": ["error", 4],              // Enforce 4-space indentation
            "comma-dangle": ["warn", "never"],  // Disallow trailing commas
            "curly": "warn",                    // Require curly braces for all control statements
            "no-trailing-spaces": "warn"        // Disallow trailing spaces
        }
    }
];