const path = require('path');
const resolve = (...filePath) => path.resolve(__dirname, ...filePath);
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {

  const base = {
    mode: env,
    entry: resolve('index.js'),
    output: {
      path: resolve('./dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader'
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          use: 'eslint-loader',
          include: resolve('src'),
          exclude: resolve('node_modules')
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: {
            configFile: resolve('.eslintrc.json'),
            failOnWarning: true,
            failOnError: false,
            cache: true
          }
        }
      })
    ]
  };

  return base;
};