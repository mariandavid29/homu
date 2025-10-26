//  @ts-check
import { baseConfig } from '@homu/linter';
import eslintReact from '@eslint-react/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import { tanstackConfig } from '@tanstack/eslint-config';

export default [
  ...baseConfig,
  ...tanstackConfig,
  reactHooks.configs.flat.recommended,
  eslintReact.configs['strict-typescript'],
];
