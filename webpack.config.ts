import { Configuration } from "webpack";
import * as path from "path";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import "webpack-dev-server";

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
        use: "ts-loader",
      },
      // {
      //     test: /\.css$/,
      //     include: /\.module\.css$/,
      //     use: [
      //         'style-loader',
      //         {
      //             loader: 'css-loader',
      //             options: {
      //                 importLoaders: 1,
      //                 modules: true
      //             }
      //         }
      //     ]
      // },
      // {
      //     test: /\.css$/,
      //     exclude: /\.module\.css$/,
      //     use: ['style-loader', 'css-loader']
      // }
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./demo/index.html",
      // favicon: './demo/favicon-32x32.png'
    }),
  ],
};

export default config;
