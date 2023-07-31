import { resolve } from "node:path";

import { defineConfig } from "vite";
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  publicDir: false,
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
  plugins: [
    svelte({
      compilerOptions: {
        cssHash: ({ hash, css }) => `css-${hash(css)}`,
      },
      preprocess: [vitePreprocess()],
    }),
  ],
  server: {
    port: 3000,
    host: true,
  },
  resolve: {
    alias: {
      "~": resolve("./src"),
    },
  },
});
