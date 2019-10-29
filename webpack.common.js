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
    sidebar: './src/sidebar/index.tsx',
  },
  resolve: {
    modules: [SRC_DIR, 'node_modules'],
    extensions: ['.js', '.json', '.ts', '.tsx'],
    alias: {
      'react': 'preact/compat',
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
            }
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
        test: /\.(js|ts)x?$/, // TYPESCRIPT
        use: [
          {
            loader: 'cache-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: false,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      browser: 'webextension-polyfill',
    }),
    new CopyPlugin([
      { from: 'src/assets', to: '.' },
      { from: 'src/manifest.json', to: '.'},
    ]),
    new HtmlWebpackPlugin({
      chunks: ['sidebar'],
      template: 'src/sidebar/template.html',
      filename: 'sidebar.html',
    }),
    new MiniCssExtractPlugin(),
  ],
};
