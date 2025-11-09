//  @ts-check
import { baseConfig } from '@homu/linter';

export default [
  ...baseConfig,
  {
    ignores: ['dist/**'],
  },
];
