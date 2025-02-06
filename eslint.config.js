import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from '@stylistic/eslint-plugin'


/** @type {import('eslint').Linter.Config[]} */
export default [
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  stylisticJs.configs["recommended-flat"]
];