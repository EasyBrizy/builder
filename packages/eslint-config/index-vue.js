module.exports = {
  extends: [
    "turbo",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["eslint-plugin-vue"],
  parser: "vue-eslint-parser",
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  rules: {
    "no-unused-vars": "error",
    "@typescript-eslint/no-unused-vars": "error",
    semi: ["error", "always"],
    quotes: ["error", "double"],
  },
}
