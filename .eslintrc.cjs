/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

/**
 * Rules: https://eslint.org/docs/latest/use/configure/rules
 */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',

    './.eslintrc.vue.cjs',
    './.eslintrc.import-plugin.cjs',
    './.eslintrc-auto-import.json',
  ],
  rules: {
    camelcase: 'warn',

    // https://typescript-eslint.io/rules/no-unused-vars/
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],

    // https://typescript-eslint.io/rules/naming-convention/
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'enumMember', format: ['PascalCase'] },
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

    'spaced-comment': [
      'warn',
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-', '+'],
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended'],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
