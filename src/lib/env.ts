// interface ImportMetaEnv {
//   readonly VITE_APP_TITLE?: string;
//   readonly VITE_API_URL?: string;
//   readonly MODE: string;
//   readonly DEV: boolean;
//   readonly PROD: boolean;
//   readonly SSR: boolean;
// }

// interface ImportMeta {
//   readonly env: ImportMetaEnv;
// }

export const env = {
  mode: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  appTitle: import.meta.env.VITE_APP_TITLE || "Product Management",
  apiUrl: import.meta.env.VITE_API_URL,
} as const;
