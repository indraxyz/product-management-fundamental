import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  const isDev = mode === "development";

  return {
    plugins: [
      react({
        jsxRuntime: "automatic",
        babel: {
          plugins: isDev ? [] : [],
        },
      }),
      tailwindcss(),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@/components": path.resolve(__dirname, "./src/components"),
        "@/hooks": path.resolve(__dirname, "./src/hooks"),
        "@/lib": path.resolve(__dirname, "./src/lib"),
        "@/types": path.resolve(__dirname, "./src/types"),
        "@/context": path.resolve(__dirname, "./src/context"),
        "@/routes": path.resolve(__dirname, "./src/routes"),
        "@/styles": path.resolve(__dirname, "./src/styles"),
        "@/assets": path.resolve(__dirname, "./src/assets"),
      },
    },

    esbuild: isProd
      ? {
          drop: ["console", "debugger"],
          legalComments: "none",
        }
      : {
          legalComments: "inline",
        },

    build: {
      target: "es2022",
      sourcemap: isDev,
      cssCodeSplit: true,
      cssMinify: isProd ? "lightningcss" : false,
      minify: isProd ? "esbuild" : false,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              if (id.includes("react") || id.includes("react-dom")) {
                return "react-vendor";
              }
              if (id.includes("react-router")) {
                return "router-vendor";
              }
              if (
                id.includes("react-hook-form") ||
                id.includes("zod") ||
                id.includes("@hookform")
              ) {
                return "form-vendor";
              }
              if (id.includes("lucide-react")) {
                return "icons-vendor";
              }
              return "vendor";
            }
          },
          entryFileNames: isProd ? "assets/[name]-[hash].js" : "assets/[name].js",
          chunkFileNames: isProd
            ? "assets/[name]-[hash].js"
            : "assets/[name].js",
          assetFileNames: isProd
            ? "assets/[name]-[hash].[ext]"
            : "assets/[name].[ext]",
        },
      },
      reportCompressedSize: false,
    },

    server: {
      port: 5173,
      strictPort: false,
      host: true,
      open: false,
      hmr: {
        overlay: true,
      },
    },

    preview: {
      port: 4173,
      host: true,
    },

    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router",
        "react-hook-form",
        "zod",
        "react-hot-toast",
        "lucide-react",
      ],
      exclude: [],
    },
  };
});
