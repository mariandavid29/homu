import js from '@eslint/js';
import ts from 'typescript-eslint';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig } from 'eslint/config';

export const baseConfig = defineConfig([
  {
    ignores: ['**/*.js', '**/*.cjs'],
  },
  js.configs.recommended,
  ...ts.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    rules: {
      'no-unused-vars': 'off',
      'array-callback-return': 'warn',
      'no-await-in-loop': 'warn',
      'no-duplicate-imports': 'error',
      'no-template-curly-in-string': 'warn',
      'camelcase': 'warn',
      'capitalized-comments': ['warn', 'always'],
      'eqeqeq': ['error', 'always'],
      'no-console': 'warn',
      'prefer-const': 'warn',
      'require-await': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  eslintConfigPrettier,
]);
