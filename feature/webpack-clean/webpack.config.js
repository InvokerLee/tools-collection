const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'api-clean-plugin'),
    filename: 'index.js',
    library: 'ApiCleanPlugin',
    libraryTarget: 'commonjs',
  },
  module: {},
  plugins: [
    new CleanWebpackPlugin(),
  ],
  target: 'node',
}
