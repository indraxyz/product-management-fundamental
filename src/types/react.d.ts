import React from "react";

// Extend React types
declare module "react" {
  // Extend HTML element props
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Custom data attributes
    "data-testid"?: string;
    "data-cy"?: string;

    // Custom event handlers
    onDoubleClick?: (event: React.MouseEvent<T>) => void;
    onContextMenu?: (event: React.MouseEvent<T>) => void;
  }

  // Extend button element props
  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    "aria-pressed"?: boolean | "mixed";
    "aria-expanded"?: boolean;
    "aria-haspopup"?: boolean | "menu" | "listbox" | "tree" | "grid" | "dialog";
  }

  // Extend input element props
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    "aria-invalid"?: boolean | "grammar" | "spelling";
    "aria-required"?: boolean;
    "aria-describedby"?: string;
  }
}

// Extend CSS properties
declare module "react" {
  interface CSSProperties {
    // Custom CSS properties
    "--primary-color"?: string;
    "--secondary-color"?: string;
    "--accent-color"?: string;
    "--text-color"?: string;
    "--bg-color"?: string;

    // CSS Grid properties
    "grid-template-areas"?: string;
    "grid-area"?: string;

    // CSS Custom properties
    [key: `--${string}`]: string | number | undefined;
  }
}

export {};
