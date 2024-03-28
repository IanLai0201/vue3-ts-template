/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

/**
 * Rules: https://typescript-eslint.io/rules/
 */
module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
  },
  overrides: [
    {
      parser: '@typescript-eslint/parser',
      files: ['*.ts', '*.tsx', '*.mts', '*.cts', /* support vue ts */ '*.vue'],
      rules: {
        // https://typescript-eslint.io/rules/no-unused-vars/
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
          },
        ],

        // https://typescript-eslint.io/rules/lines-between-class-members/
        '@typescript-eslint/lines-between-class-members': [
          'warn',
          'always',
          {
            exceptAfterOverload: true,
            exceptAfterSingleLine: false,
          },
        ],

        // https://typescript-eslint.io/rules/naming-convention/
        camelcase: 'off',
        '@typescript-eslint/naming-convention': [
          'warn',
          {
            selector: 'default',
            format: ['camelCase'],
          },
          {
            selector: 'import',
            format: ['camelCase', 'PascalCase'],
          },
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
          },
          {
            selector: ['property'],
            modifiers: ['readonly'],
            format: ['camelCase', 'UPPER_CASE'],
          },
          {
            selector: ['property'],
            modifiers: ['requiresQuotes'],
            format: null,
          },
          {
            selector: ['method'],
            modifiers: ['requiresQuotes'],
            format: null,
          },
          {
            selector: 'parameter',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'objectLiteralProperty',
            modifiers: ['requiresQuotes'],
            format: null,
          },
          {
            selector: ['typeLike', 'enumMember'],
            format: ['PascalCase'],
          },
        ],
      },
    },
  ],
};
