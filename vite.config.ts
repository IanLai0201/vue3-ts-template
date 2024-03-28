import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
  // If you need environment variables, please refer to the following documents.
  // https://vitejs.dev/config/#using-environment-variables-in-config

  // example: loadEnv file
  // const env = loadEnv(mode, `${process.cwd()}/environments`);

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

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
          filepath: './eslint-plugins/.eslintrc-auto-import.json',
        },
        imports: ['vue', 'vue-router'],
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        dts: 'src/types/auto-imports.d.ts',
      }),
    ],

    envDir: './environments',

    build: {
      sourcemap: true,
    },
  };
});
