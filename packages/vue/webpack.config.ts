// @ts-ignore
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".vue"],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /(node_modules)/,
        loader: "vue-loader",
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        loader: "swc-loader",
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
