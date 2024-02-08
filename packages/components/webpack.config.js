const path = require("path");
const webpack = require("webpack");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// require("dotenv").config();

module.exports = (_, argv) => {
  const srcPath = path.resolve(__dirname, "src");
  const distPath = path.resolve(__dirname, "dist");

  const IS_PRODUCTION = argv.mode === "production";
  const MODE = IS_PRODUCTION ? "production" : "development";
  const WATCH = argv.watch === true;

  return {
    mode: MODE,
    entry: {
      index: `${srcPath}/index.ts`,
      // export: `${srcPath}/export.ts`,
    },
    output: {
      path: distPath,
      filename: "[name].js",
    },
    resolve: {
      extensions: [".js", ".json", ".ts", ".tsx", ".css"],
    },
    module: {
      rules: [
        {
          test: /\.(ts)x?$/,
          exclude: /(node_modules)/,
          use: {
            loader: "swc-loader",
            options: {
              sourceMap: !IS_PRODUCTION,
              minify: IS_PRODUCTION,
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                  },
                },
              },
            },
          },
        },
        // {
        //   test: /\.css$/i,
        //   use: [MiniCssExtractPlugin.loader, "css-loader"],
        // },
        // {
        //   test: /\.s[ac]ss$/i,
        //   use: [
        //     MiniCssExtractPlugin.loader,
        //     "css-loader",
        //     "sass-loader",
        //     "postcss-loader",
        //   ],
        // },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name][ext]",
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.IS_PRODUCTION": JSON.stringify(MODE),
        "process.env.BASE_URL": JSON.stringify(process.env.BASE_URL),
        "process.env.BASE_COMPONENTS_URL": JSON.stringify(
          process.env.BASE_COMPONENTS_URL
        ),
        "process.env.MODE": JSON.stringify(process.env.MODE),
      }),
      // new MiniCssExtractPlugin({
      //   filename: "index.css"
      // })
    ],
    externals: { react: "React", "react-dom": "ReactDOM" },
    devtool: IS_PRODUCTION ? false : "eval-cheap-module-source-map",
    watch: WATCH,
  };
};
