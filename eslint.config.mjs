import prettier from 'eslint-plugin-prettier';
import expo from 'eslint-plugin-expo';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends('expo', 'prettier'),
  {
    plugins: {
      expo,
      prettier,
    },

    rules: {
      'prettier/prettier': [
        'error',
        { singleQuote: true, trailingComma: 'all' },
      ],
    },
  },
];
