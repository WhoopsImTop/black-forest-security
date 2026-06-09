import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";
import type { OutputAsset, OutputChunk, Plugin } from "rollup";
import { defineConfig } from "vite";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

function injectCssIntoJs(): Plugin {
  return {
    name: "inject-css-into-js",
    generateBundle(_options, bundle) {
      const cssAsset = Object.values(bundle).find(
        (item): item is OutputAsset =>
          item.type === "asset" && item.fileName.endsWith(".css"),
      );
      const jsChunk = Object.values(bundle).find(
        (item): item is OutputChunk =>
          item.type === "chunk" && item.isEntry === true,
      );

      if (!cssAsset || !jsChunk || typeof cssAsset.source !== "string") return;

      const cssInjection = `(function(){var s=document.createElement("style");s.textContent=${JSON.stringify(cssAsset.source)};document.head.appendChild(s);})();`;
      jsChunk.code = `${cssInjection}\n${jsChunk.code}`;
      delete bundle[cssAsset.fileName];
    },
  };
}

export default defineConfig(({ command }) => ({
  root: rootDir,
  publicDir: command === "serve" ? resolve(rootDir, "../public") : false,
  plugins: [vue()],
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
      plugins: [injectCssIntoJs()],
      output: {
        inlineDynamicImports: true,
      },
    },
  },
}));
