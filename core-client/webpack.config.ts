import * as path from "path";

const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".js", ".json", ".ts"],
    fallback: {
      util: require.resolve("util/"),
      path: require.resolve("path-browserify"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: "swc-loader",
      },
    ],
  },
  plugins: [new Dotenv()],
};
