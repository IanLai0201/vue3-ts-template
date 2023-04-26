/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  /**
   * GSTC License
   */
  readonly VITE_GSTC_LICENSE_KEY: string;
}
