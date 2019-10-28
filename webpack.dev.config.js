const path = require('path');
const webpack = require('webpack');

module.exports = [
  {
    target: 'node',
    entry: path.resolve(__dirname, 'src/api/index.js'),
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist/api'),
    },
    resolve: {
      alias: {
        '@lib': path.resolve(__dirname, 'src/lib'),
      },
    },
    // this fixes a stupid bug with a restify dependency
    plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })],
    mode: 'development',
  },
];
