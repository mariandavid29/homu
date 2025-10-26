//  @ts-check
import { baseConfig } from "@homu/formatter";

/** @type {import('prettier').Config} */
const config = {
  ...baseConfig,
  jsxSingleQuote: true,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
