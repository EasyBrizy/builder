// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["@brizy/docs-vue/dist/index.css"],
  buildModules: ["@nuxt/typescript-build"],
});
