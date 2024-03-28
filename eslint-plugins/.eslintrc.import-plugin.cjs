/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

/**
 * eslint-plugin-import
 *
 * https://github.com/import-js/eslint-plugin-import
 */
module.exports = {
  plugins: ['import'],
  rules: {
    'import/order': [
      'warn',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
      },
    ],
  },
};
