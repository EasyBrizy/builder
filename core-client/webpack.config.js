const path = require("path");

module.exports = (env, argv) => {
  return {
    entry: "./src/index.ts",
    mode: argv.mode,
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
  };
};
