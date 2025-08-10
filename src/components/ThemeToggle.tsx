import React from "react";
import { useThemeContext } from "../context/ThemeContext";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeContext();

  const isDark = theme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="icon-btn"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21.752 15.002A9.718 9.718 0 0112 21c-5.385 0-9.75-4.365-9.75-9.75 0-4.126 2.594-7.64 6.253-9.026A7.5 7.5 0 0021.752 15.002z"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
      )}
    </button>
  );
};
