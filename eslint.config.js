// import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
    { files: ["**/*.{js,mjs,cjs,ts}"] },
    {
        languageOptions: {
            globals: {
                "PIXI": "readonly"  // Define PIXI as a global variable
            }
        }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        "rules": {
            "quotes": ["warn", "double"],       // Enforce double quotes
            "no-unused-vars": "warn",           // Warn about unused variables
            "eqeqeq": ["warn", "always"],       // Enforce strict equality (===)
            "no-console": "off",                // Allow console.log statements
            "indent": ["error", 4],             // Enforce 4-space indentation
            "comma-dangle": ["warn", "never"],  // warn trailing commas
            "curly": "warn",                    // Require curly braces for all control statements
            "no-trailing-spaces": "warn" ,      // warm trailing spaces,
            "no-undef": "off"                   // Disable the no-undef rule
            // "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
        }
    }
];