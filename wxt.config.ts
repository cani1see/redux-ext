import { defineConfig } from 'wxt';
import path from "path";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  srcDir: "src",
  outDir: "dist",
  publicDir: "static",
  webExt: {
    chromiumArgs: ["--user-data-dir=./.wxt/chrome-data"],
  },
  manifest: ({ browser, manifestVersion, mode, command }) => {
    return {
      name: "wxt-dev-extension",
    }
  },
  vite: () => ({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  })
});
