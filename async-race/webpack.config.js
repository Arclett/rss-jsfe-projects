const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const srcPath = path.resolve(__dirname, "src");

const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          port: "auto",
          static: {
            directory: srcPath,
            watch: true,
          },
        },
      };

module.exports = ({ development }) => {
  return {
    mode: development ? "development" : "production",
    devtool: development ? "inline-source-map" : false,
    entry: {
      main: path.resolve(__dirname, "./src/index.ts"),
    },
    context: srcPath,

    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].bundle.js",
      assetModuleFilename: "assets/[hash][ext]",
    },

    module: {
      rules: [
        {
          test: /\.[tj]s$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },

        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
        {
          test: /\.css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { publicPath: "../" },
            },
            "css-loader",
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { publicPath: "../" },
            },
            "css-loader",
            "sass-loader",
          ],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: "Async-race",
        template: "./index.html",
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({ filename: "css/[name].[contenthash].css" }),
      new CopyPlugin({
        patterns: [
          {
            from: "**/*",
            context: srcPath,
            globOptions: {
              ignore: [
                "**/*.js",
                "**/*.ts",
                "**/*.scss",
                "**/*.sass",
                "**/*.html",
              ],
            },
            noErrorOnMissing: true,
            force: true,
          },
        ],
      }),
    ],
    ...devServer(development),
  };
};
