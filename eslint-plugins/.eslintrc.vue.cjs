/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

/**
 * https://eslint.vuejs.org/rules/
 */
module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',

    // https://future-architect.github.io/eslint-plugin-vue-scoped-css/
    'plugin:vue-scoped-css/vue3-recommended',
  ],
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        // https://eslint.vuejs.org/rules/component-tags-order.html
        'vue/component-tags-order': [
          'warn',
          {
            order: ['script', 'template', 'style'],
          },
        ],

        // https://eslint.vuejs.org/rules/block-lang.html
        'vue/block-lang': [
          'error',
          {
            script: {
              lang: 'ts',
            },
            style: {
              lang: 'scss',
            },
          },
        ],

        // https://eslint.vuejs.org/rules/html-self-closing.html
        'vue/html-self-closing': [
          'error',
          {
            html: {
              void: 'always',
              normal: 'never',
              component: 'never',
            },
            svg: 'always',
            math: 'always',
          },
        ],

        // https://eslint.vuejs.org/rules/html-closing-bracket-newline.html
        'vue/html-closing-bracket-newline': [
          'error',
          {
            singleline: 'never',
            multiline: 'always',
          },
        ],

        // https://eslint.vuejs.org/rules/custom-event-name-casing.html
        'vue/custom-event-name-casing': [
          'error',
          'camelCase',
          {
            ignores: [],
          },
        ],

        // https://future-architect.github.io/eslint-plugin-vue-scoped-css/rules/enforce-style-type.html
        'vue-scoped-css/enforce-style-type': 'off',

        // https://future-architect.github.io/eslint-plugin-vue-scoped-css/rules/no-unused-selector.html
        'vue-scoped-css/no-unused-selector': 'off',

        // https://future-architect.github.io/eslint-plugin-vue-scoped-css/rules/require-v-deep-argument.html
        'vue-scoped-css/require-v-deep-argument': 'off',
      },
    },
  ],
  globals: { defineOptions: 'readonly' },
};
