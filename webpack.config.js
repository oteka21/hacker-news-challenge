const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

function isProduction(){
  return process.env.NODE_ENV === 'production'
}

const plugins = [
  new HtmlWebpackPlugin({
    template: require('html-webpack-template'),
    inject: false,
    title: 'Hacker news',
    appMountId: 'app',
    links: [
      {
        href: './src/assets/apple-icon.png',
        rel: 'icon',
        sizes: '32x32',
        type: 'image/png'
      }
    ]
  })
]


if(isProduction()){
  plugins.push(
    new webpack.DllReferencePlugin({
      manifest: require('./modules-manifest.json')
    })
  )
}

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
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  },
  plugins,
  devServer: {
    open: true,
    progress: true,
    historyApiFallback: true
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}