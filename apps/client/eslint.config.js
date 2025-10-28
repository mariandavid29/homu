//  @ts-check
import { baseConfig } from '@homu/linter';
import eslintReact from '@eslint-react/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import { tanstackConfig } from '@tanstack/eslint-config';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default [
  ...baseConfig,
  ...tanstackConfig,
  ...pluginQuery.configs['flat/recommended'],
  reactHooks.configs.flat.recommended,
  eslintReact.configs['strict-typescript'],
];
