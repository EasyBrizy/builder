// @ts-ignore
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        exclude: /(node_modules)/,
        use: "swc-loader",
      },
    ],
  },
};
