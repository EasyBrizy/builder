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
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
    },
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
