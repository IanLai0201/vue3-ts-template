/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

/**
 * Rules: https://eslint.org/docs/latest/use/configure/rules
 */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',

    './eslint-plugins/.eslintrc-ts.cjs',
    './eslint-plugins/.eslintrc.vue.cjs',
    './eslint-plugins/.eslintrc.import-plugin.cjs',
    './eslint-plugins/.eslintrc-auto-import.json',
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
  // for in lint-staged
  ignorePatterns: [
    '*.min.*',
    '*.d.ts',
    'dist',
    'LICENSE*',
    'output',
    'out',
    'coverage',
    'node_modules',
    'public',
    'temp',
    'src/assets',
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '*.css',
    '*.scss',
    '*.png',
    '*.svg',
    '*.ico',
    '*.toml',
    '*.patch',
    '*.txt',
    '*.crt',
    '*.key',
    '*.json',
    '*.jsonc',
    '*.json5',
    '*.yml',
    '*.yaml',
    'Dockerfile',
    'Jenkinsfile*',
    '.eslintrc-auto-import.json',
    'auto-imports.d.ts',
    'components.d.ts',
    'nginx/',
    'environments/',
    'index.html',
    'README.md',
  ],
};
