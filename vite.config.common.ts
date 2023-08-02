import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";
import type { UserConfig } from "vite";

export function createCommonConfig(index: string): UserConfig {
  return {
    publicDir: false,
    plugins: [
      svelte({
        compilerOptions: {
          cssHash: ({ hash, css }) => `css-${hash(css)}`,
        },
        preprocess: [vitePreprocess()],
      }), {
        name: "deep-index",
        configureServer(server) {
          server.middlewares.use(
            (req, _, next) => {
              if (req.url === "/") {
                req.url = index;
              }
              next();
            },
          );
        },
      },
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
  };
}
