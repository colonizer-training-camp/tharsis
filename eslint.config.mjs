import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

// local plugin import
import localRules from './eslint-rules/convert-import-path.js';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      'simple-import-sort': simpleImportSort,
      'local-rules': localRules,
    },
    rules: {
      'local-rules/convert-import-path': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^node:'], // Node builtin
            ['^react', '^@?\\w'], // External Packages
            ['^@/'], // Absolute paths
            ['^\\.'], // Relative paths
          ],
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);
