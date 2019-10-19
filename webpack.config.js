const path = require('path');
const resolve = (...filePath) => path.resolve(__dirname, ...filePath)
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {

  const base = {
    mode: env,
    entry: resolve('./src/index.js'),
    output: {
      path: resolve('./dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: 'babel-loader'
      }]
    },
    plugins: [
      new CleanWebpackPlugin()
    ]
  }

  return base
}