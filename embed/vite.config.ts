import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ command }) => ({
  root: rootDir,
  publicDir: command === "serve" ? resolve(rootDir, "../public") : false,
  plugins: [vue()],
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      command === "serve" ? "development" : "production",
    ),
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  build: {
    outDir: resolve(rootDir, "dist"),
    emptyOutDir: true,
    copyPublicDir: false,
    lib: {
      entry: resolve(rootDir, "src/main.ts"),
      name: "SimpleKIChat",
      formats: ["iife"],
      fileName: () => "chat-widget.js",
    },
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
}));
