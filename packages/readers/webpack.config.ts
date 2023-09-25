// @ts-ignore
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /.ts/,
        exclude: /(node_modules)/,
        use: "swc-loader",
      },
    ],
  },
};
