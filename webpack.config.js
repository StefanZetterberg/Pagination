var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/Pagination.jsx',
  output: {
    path: path.resolve('lib'),
    filename: 'Pagination.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules:
      [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          use: 'babel-loader'
        }
      ]
  }
}
