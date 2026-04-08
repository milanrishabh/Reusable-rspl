import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { readdirSync } from "fs";

/**
 * Library-mode build config.
 * Run via: npm run build
 * Outputs ESM + CJS bundles and a single style.css to dist/.
 *
 * Entry map: main barrel + one entry per generated subpath file so that
 * every "./<key>" export in package.json resolves to a real JS file.
 */

// Derive subpath entry names from the generated files in src/subpaths/.
const subpathEntries: Record<string, string> = {};
for (const file of readdirSync("src/subpaths").filter((f) =>
  f.endsWith(".ts"),
)) {
  const key = file.replace(".ts", "");
  subpathEntries[`subpaths/${key}`] = `src/subpaths/${key}.ts`;
}

const entries = { index: "src/index.ts", ...subpathEntries };

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  // Prevent public/ assets (favicon, img/*) from leaking into dist/.
  publicDir: false,
  build: {
    lib: {
      entry: entries,
      formats: ["es", "cjs"],
      fileName: (format, entryName) =>
        `${entryName}.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      // Host app must provide react — never bundle it.
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        // Emit the single Tailwind stylesheet as style.css.
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] ?? assetInfo.name ?? "";
          if (name.endsWith(".css")) return "style.css";
          return name;
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
