//  @ts-check
import { baseConfig } from '@homu/linter';
import { globalIgnores } from 'eslint/config';

export default [...baseConfig, globalIgnores(['.wrangler/'])];
