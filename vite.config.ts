import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import DefineOptions from 'unplugin-vue-define-options/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    /**
     * unplugin-auto-import setting
     *
     * https://github.com/antfu/unplugin-auto-import
     */
    AutoImport({
      eslintrc: {
        enabled: true,
      },
      imports: ['vue', 'vue-router'],
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      dts: './types/auto-imports.d.ts',
    }),

    /**
     * unplugin-vue-define-options
     *
     * https://vue-macros.sxzz.moe/macros/define-options.html
     */
    DefineOptions(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
