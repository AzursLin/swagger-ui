/**
 * @prettier
 */

// NOTE: this config *does not* inherit from `_config-builder`.
// It is also used in the dev config.

import path from "path"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import IgnoreAssetsPlugin from "ignore-assets-webpack-plugin"
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin"

export default {
  mode: "production",

  entry: {
    "swagger-ui": "./src/style/main.scss",
  },

  module: {
    rules: [
      {
        test: [/\.(scss)(\?.*)?$/],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: loader => [
                require("cssnano")(),
                require("autoprefixer")(),
              ],
            },
          },
          {
            loader: "sass-loader",
            options: {
              outputStyle: "expanded",
              sourceMap: true,
              sourceMapContents: "true",
            },
          },
        ],
      },
      {
        oneOf: [
          // Process JS with Babel.
          {
            test: /\.(js|jsx|mjs)$/,
            exclude: /node_modules/,
            loader: require.resolve('babel-loader'),
            options: {
                plugins: [
                    // 引入样式为 css
                    // style为true 则默认引入less
                    ['import', { libraryName: 'antd', style: 'css' }],
                ]
            }
         }
      ]
    },
     {//antd样式处理
        test:/\.css$/,
        exclude:/src/,
        use:[
          { loader: "style-loader",},
          {
            loader: "css-loader",
            options:{
            importLoaders:1
          }
          }
          ]
      },
      { test: /\.(txt|yaml)$/, loader: "raw-loader" },
      { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: "url-loader" },  
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new IgnoreAssetsPlugin({
      // This is a hack to avoid a Webpack/MiniCssExtractPlugin bug, for more
      // info see https://github.com/webpack-contrib/mini-css-extract-plugin/issues/151
      ignore: ["swagger-ui.js", "swagger-ui.js.map"],
    }),
  ],

  devtool: "source-map",

  output: {
    path: path.join(__dirname, "../", "dist"),
    publicPath: "/dist",
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
}
