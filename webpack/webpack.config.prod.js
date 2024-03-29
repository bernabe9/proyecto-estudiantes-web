import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import Dotenv from 'dotenv-webpack';
import { GenerateSW } from 'workbox-webpack-plugin';
import 'babel-polyfill';

import resolve from './shared/resolve';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env.BROWSER': true,
  __DEV__: false
};

export default {
  resolve,
  devtool: 'source-map',
  entry: ['babel-polyfill', path.resolve(__dirname, '../src/index')],
  target: 'web',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: './',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js'
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),

    new webpack.DefinePlugin(GLOBALS),

    // Generate an external css file with a hash in the filename
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),

    // Generate HTML file that contains references to generated bundles.
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),

    new Dotenv({
      path: path.resolve(__dirname, `../.env.${process.env.ENV || 'prod'}`),
      systemvars: true,
    }),

    new GenerateSW({
      swDest: './main-sw.js',
      clientsClaim: true,
      skipWaiting: true,
      navigateFallback: '/',
      globDirectory: 'dist/',
      runtimeCaching: [
        {
          urlPattern: new RegExp('http?://localhost:3000/(.*)'),
          handler: 'cacheFirst',
          options: {
            cacheName: 'api',
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ]
    })
  ],
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?name=[name].[ext]' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]' },
      { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]' },
      { test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]' },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
      {
        test: /(\.css|\.scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')
              ],
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, '../src', 'scss')],
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
