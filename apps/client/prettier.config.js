//  @ts-check
import { baseConfig } from '@homu/formatter';

/** @type {import('prettier').Config} */
const config = {
  ...baseConfig,
  jsxSingleQuote: true,
};

export default config;
