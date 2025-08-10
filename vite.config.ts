import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  return {
    plugins: [react(), tailwindcss()],
    esbuild: isProd
      ? {
          drop: ["console", "debugger"],
        }
      : undefined,
    build: {
      target: "es2022",
      sourcemap: false,
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: [
              "react",
              "react-dom",
              "react-hook-form",
              "zod",
              "react-hot-toast",
            ],
          },
        },
      },
    },
  };
});
