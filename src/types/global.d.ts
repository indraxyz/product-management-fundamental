// Global type declarations
declare global {
  // Environment variables
  interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_VERSION: string;
    readonly VITE_DEBUG: string;
    [key: string]: string | undefined;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  // Global utility types
  type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
  };

  type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

  type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

  // Common utility types
  type Nullable<T> = T | null;
  type Undefinable<T> = T | undefined;
  type NonNullable<T> = T extends null | undefined ? never : T;

  // Array utility types
  type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;
  type ArrayLength<T> = T extends readonly any[] ? T["length"] : never;

  // Function utility types
  type FunctionReturnType<T> = T extends (...args: any[]) => infer R
    ? R
    : never;
  type FunctionParameters<T> = T extends (...args: infer P) => any ? P : never;

  // Object utility types
  type KeysOfType<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
  }[keyof T];

  type ValuesOfType<T, U> = {
    [K in keyof T]: T[K] extends U ? T[K] : never;
  }[keyof T];
}

export {};
