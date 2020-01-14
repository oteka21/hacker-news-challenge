const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')

// TODO: add favicon to the config
module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.[contenthash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hacker news',
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'app',
      appMountTag: 'section'
    })
  ],
  devServer: {
    open: true,
    progress: true,
    historyApiFallback: true
  }
}