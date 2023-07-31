import { resolve } from "node:path";

import { defineConfig } from "vite";

export default defineConfig({
  publicDir: false,
  build: {
    outDir: "dist/content",
    assetsDir: ".",
    lib: {
      entry: {
        index: "src/content.ts",
      },
      formats: ["iife"],
      name: "videoTools",
      fileName: (_, name) => `${name}.js`,
    },
  },
  resolve: {
    alias: {
      "~": resolve("./src"),
    },
  },
});
