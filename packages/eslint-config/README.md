# @brizy/eslint-config

@brizy/eslint-config have a ready config to use

## Instalation

In `package.json` in the `devDependencies` field `@brizy/eslint-config: "*"`

Also need to create script named `lint` to run `eslint`

For example: `"lint": "eslint \"src/**/*.ts*\""`

## Usage

Create an .eslintrc.js in root folder of your project

Add a directive `"extends": ["@brizy/eslint-config"]` or/and another configs

### For example

```
module.exports = {
  root: true,
  extends: ["@brizy/eslint-config"],
};

```

Note that `"extends"` applies string[] of configs

### If you need to override config, for example add specified rules for your project you can add them in `.eslintrc.js` file

```
module.exports = {
  root: true,
  extends: ["next", "@brizy/eslint-config"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};

```

### There are basic settings of `eslint` for most your of projects

```
module.exports = {
  extends: [
    "turbo",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2022,
  },
  rules: {
    "no-unused-vars": "error",
    "@typescript-eslint/no-unused-vars": "error",
    semi: ["error", "always"],
    quotes: ["error", "double"],
  },
};

```
