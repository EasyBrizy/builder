import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  head: {
    title: "Brizy",
    meta: [
      {
        name: "description",
        content: "Brizy NuxtJS",
      },
    ],
  },
  paths: {
    "@utils/*": ["src/utils/*"],
    "@config": ["src/config"],
    "@components/*": ["src/components/*"],
    "@styles/*": ["src/styles/*"],
  },
  devtools: { enabled: true },
  css: ["@brizy/docs-vue/dist/index.css"],
  buildModules: ["@nuxt/typescript-build"],
  srcDir: "./src",
  alias: {
    src: path.resolve(__dirname, "src/hooks/useEditor/index.vue"),
  },
});
