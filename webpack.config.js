const path = require('path');
const webpack = require('webpack');

module.exports = {
  name: 'Cubicle',
  devtool: 'cheap-module-source-map',
  target: 'node',
  entry: {
    cubicle: [
      'babel-polyfill',
      './src/main.js',
    ],
    wrapper: [
      'babel-polyfill',
      './src/wrapper.js',
    ],
  },
  output: {
    filename: '[name]',
    path: './bin'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.BannerPlugin("#!/usr/bin/env node", { entryOnly: true, raw: true })
  ],
  module: {
    loaders: [
      { test: /\.node$/, loader: "file-loader" },
      { test: /\.json$/, loader: "json-loader" },
      {
        test: /(\.js)$/,
        exclude: path.resolve(__dirname, "node_modules"),
        loader: 'babel-loader',
        query: {
          presets: ['latest'],
          plugins: [
            'transform-regenerator',
            'syntax-decorators',
            'transform-async-generator-functions',
            'transform-class-properties',
            'transform-export-extensions',
            'transform-object-rest-spread',
          ],
        },
      },
    ],
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      root: 'src',
      figlet$: path.resolve(__dirname, ".figletrc")
    },
    extensions: ['', '.js'],
  },
}
