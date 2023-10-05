// @ts-expect-error: require
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Shape Tracker",
      template: "./src/index.html",
      inject: "body",
    }),
  ],
  resolve: {
    extensions: [".js", ".json", ".ts"],
    fallback: {
      util: require.resolve("util/"),
      path: require.resolve("path-browserify"),
    },
  },
};
