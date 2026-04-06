import { defineConfig, mergeConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import viteTestConfig from "./vitest.config";
import { visualizer } from "rollup-plugin-visualizer";

export default mergeConfig(
  viteTestConfig,
  defineConfig({
    plugins: [
      react(),
      tsconfigPaths(),
      tailwindcss(),
      visualizer({
        open: false, // Automatically open report in browser
        filename: "dist/stats.html", // Output file location
        gzipSize: true, // Show gzipped sizes
        brotliSize: true, // Show brotli sizes
        template: "treemap", // Visualization type: 'sunburst', 'treemap', 'network'
      }),
    ],
    clearScreen: false,
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            "ui-vendor": ["lucide-react", "react-toastify"],
          },
          // Optimize chunk size
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
      // Optimize chunk size warnings
      chunkSizeWarningLimit: 1000,
      // Enable source maps for production debugging (optional)
      sourcemap: false, // Set to true if you need debugging
    },
  }),
);
