const path = require('path');
const webpack = require('webpack');

module.exports = {
  name: 'Cubicle',
  devtool: 'cheap-module-source-map',
  target: 'node',
  entry: {
    app: [
      'babel-polyfill',
      './src/main.js',
    ],
  },
  output: {
    filename: 'cubicle',
    path: './bin'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.BannerPlugin("#!/usr/bin/env node", { entryOnly: true, raw: true })
  ],
  module: {
    loaders: [
      {
        loader: "figlet",
        test: /\.figletrc$/,
      },
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
