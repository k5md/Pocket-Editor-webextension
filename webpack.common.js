/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');

const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
  output: {
    filename: '[name].js',
    path: DIST_DIR,
  },
  entry: {
    sidebar: './src/sidebar/index.jsx',
    background: './src/background/index.js',
  },
  resolve: {
    modules: [SRC_DIR, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    },
  },
  module: {
    rules: [
      // CSS for node_modules
      {
        include: /node_modules/,
        test: /\.css$/i,
        use: [
          'cache-loader',
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
        ],

      },
      {
        test: /\.s[ac]ss$/i, // SCSS
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              import: true,
              modules: {
                mode: 'local',
                localIdentName: '[local]__[hash:base64:5]',
              },
            },
          },
          'cache-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png)$/, // FONTS
        use: [
          {
            loader: 'cache-loader',
          },
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.jsx?$/, // TYPESCRIPT
        use: [
          {
            loader: 'cache-loader',
          },
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: require.resolve('webextension-polyfill'),
        use: 'imports-loader?browser=>undefined',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      browser: 'webextension-polyfill',
    }),
    new CopyPlugin([
      { from: 'src/assets', to: '.' },
      { from: 'src/manifest.json', to: '.' },
    ]),
    new HtmlWebpackPlugin({
      chunks: ['sidebar'],
      template: 'src/sidebar/template.html',
      filename: 'sidebar.html',
    }),
    new MiniCssExtractPlugin(),
  ],
};
