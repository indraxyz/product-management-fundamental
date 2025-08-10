import React from "react";
type Theme = "light" | "dark";
interface ThemeContextValue {
    theme: Theme;
    setTheme: (t: Theme) => void;
    toggleTheme: () => void;
}
export declare const ThemeProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useThemeContext: () => ThemeContextValue;
export {};
