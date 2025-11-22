import React from "react";
type Theme = "light" | "dark";
interface ThemeContextValue {
    theme: Theme;
    setTheme: (t: Theme) => void;
    toggleTheme: () => void;
}
declare const ThemeContext: React.Context<ThemeContextValue | undefined>;
export declare const ThemeProvider: React.FC<{
    children: React.ReactNode;
}>;
export { ThemeContext };
export type { Theme, ThemeContextValue };
