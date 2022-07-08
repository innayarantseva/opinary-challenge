import { Configuration } from "webpack";
import * as path from "path";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as CopyWebpackPlugin from "copy-webpack-plugin";
import "webpack-dev-server";
import createStyledComponentsTransformer from "typescript-plugin-styled-components";

const styledComponentsTransformer = createStyledComponentsTransformer();

const config: Configuration = {
  mode: "development",
  entry: path.join(__dirname, "src", "index.tsx"),

  output: {
    path: path.join(__dirname, "dist/"),
    filename: "bundle.js",
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 9000,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [styledComponentsTransformer],
          }),
        },
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./demo/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "./demo/pages", to: "pages" }],
    }),
  ],
};

export default config;
