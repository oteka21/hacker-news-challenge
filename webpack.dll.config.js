const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry : {
    modules : [
      'react',
      'react-dom',
      'react-router',
      'moment'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '[name]-manifest.json')
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
  ]
}