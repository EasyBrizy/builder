import path from "path";

export default {
  head: {
    title: "Brizy",
    meta: [
      {
        name: "description",
        content: "Brizy NuxtJS",
      },
    ],
  },
  buildModules: ["@nuxt/typescript-build"],
  css: ["@brizy/docs-vue/dist/index.css"],
  srcDir: "./src",
  router: {
    middleware: ["middleware"],
  },
  alias: {
    // Your aliases here
    "@utils": path.resolve(__dirname, "src/utils"),
    "@config": path.resolve(__dirname, "src/config"),
    "@components": path.resolve(__dirname, "src/components"),
    "@styles": path.resolve(__dirname, "src/styles"),
  },
  build: {
    rollupOptions: {
      external: ["@brizy/docs-vue/dist/index.css"],
    },
  },
  runtimeConfig: {
    public: {
      API_KEY: process.env.API_KEY,
    },
  },
};
