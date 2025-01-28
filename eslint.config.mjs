import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import angularPlugin from 'eslint-plugin-angular';

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      'angular': angularPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { 'allowExpressions': false, 'allowHigherOrderFunctions': true }
      ],
      'semi': ['error', 'always'],
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'interface', format: ['PascalCase'], custom: { regex: '^I[A-Z]', match: true } },
        { selector: 'typeAlias', format: ['PascalCase'], custom: { regex: '^T[A-Z]', match: true } },
        { selector: 'enum', format: ['PascalCase'], custom: { regex: '^E[A-Z]', match: true } },
      ],
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { 'max': 1 }],
      'max-len': ['error', { 'code': 120 }],
      'quotes': ['error', 'single'],
      "comma-dangle": [
        "warn", {
          "arrays": "always-multiline",
          "objects": "always-multiline",
          "imports": "always-multiline",
          "exports": "always-multiline",
          "functions": "never"
        }
      ],
    },
    settings: {
      angular: {
        version: 'detect'
      }
    }
  }
];

export default config;
