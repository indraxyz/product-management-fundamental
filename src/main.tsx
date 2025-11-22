import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import { AppRouter } from "@/routes";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "var(--toast-bg)",
            color: "var(--toast-color)",
          },
        }}
      />
      <AppRouter />
    </ThemeProvider>
  </StrictMode>
);
