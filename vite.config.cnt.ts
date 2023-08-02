import { defineConfig } from "vite";
import { createCommonConfig } from "./vite.config.common";

export default defineConfig({
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
  ...createCommonConfig("./content.html"),
});
