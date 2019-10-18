const path = require('path');
const resolve = (...filePath) => path.resolve(__dirname, ...filePath)
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {

  const base = {
    mode: env,
    entry: resolve('./index.js'),
    output: {
      path: resolve('./dist'),
      filename: 'bundle.[hash:6].js'
    },
    plugins: [
      new CleanWebpackPlugin()
    ]
  }

  return base
}