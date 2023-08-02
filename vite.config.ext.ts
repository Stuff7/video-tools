import { defineConfig } from "vite";
import { createCommonConfig } from "./vite.config.common";

export default defineConfig({
  build: {
    outDir: "dist/extension",
    assetsDir: ".",
    lib: {
      entry: {
        index: "src/extension.ts",
      },
      formats: ["es"],
      fileName: (_, name) => `${name}.js`,
    },
  },
  ...createCommonConfig("./extension.html"),
});
