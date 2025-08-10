type Theme = "light" | "dark";
export declare const useTheme: () => {
    readonly theme: Theme;
    readonly setTheme: import("react").Dispatch<import("react").SetStateAction<Theme>>;
    readonly toggleTheme: () => void;
};
export {};
