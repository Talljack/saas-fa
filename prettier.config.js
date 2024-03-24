/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  semi: false,
  singleQuote: true,
  printWidth: 100,
  arrowParens: 'always',
  tabWidth: 2,
  useTabs: false,
  jsxSingleQuote: false,
  bracketSpacing: true
};

export default config;
