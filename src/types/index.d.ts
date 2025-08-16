// Re-export all type declarations
export * from "./svg";
export * from "./css";
export * from "./images";
export * from "./fonts";
export * from "./data";
export * from "./audio";
export * from "./video";
export * from "./global";
export * from "./react";

// Common utility types that can be imported directly
export type {
  DeepPartial,
  Optional,
  RequiredFields,
  Nullable,
  Undefinable,
  NonNullable,
  ArrayElement,
  ArrayLength,
  FunctionReturnType,
  FunctionParameters,
  KeysOfType,
  ValuesOfType,
} from "./global";
