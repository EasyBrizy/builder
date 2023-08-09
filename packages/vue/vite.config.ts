import vue from "@vitejs/plugin-vue"
import path from "path"
import typescript2 from "rollup-plugin-typescript2"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
    typescript2({
      check: false,
      include: ["src/**/*.{vue,ts}"],
      tsconfigOverride: {
        compilerOptions: {
          outDir: "dist",
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
      },
      exclude: ["vite.config.ts"],
    }),
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: "src/index.ts",
      name: "@brizy/vue",
      formats: ["es", "cjs", "umd"],
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/main.ts"),
      },
      external: ["vue", "src/hooks/useEditor/index.vue"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".ts", ".js", ".vue"],
  },
})
