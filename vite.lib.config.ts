import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Library-mode build config.
 * Run via: npm run build
 * Outputs ESM + CJS bundles and a single style.css to dist/.
 */
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      // Host app must provide react — never bundle it.
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    // Emit a single style.css containing all Tailwind output.
    cssCodeSplit: false,
    sourcemap: false,
    outDir: "dist",
    emptyOutDir: true,
  },
});
