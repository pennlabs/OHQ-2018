var webpack = require('webpack')
var path    = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

require('dotenv').config()

//XXX: Will need a separate build for production
const isProduction = process.env.NODE_ENV === 'production'

//Compile css separately, set env vars, etc.
if (!isProduction) {
  module.exports = {
    entry: [
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      './frontend/src/index.js',
    ],
    output: {
      path: __dirname,
      publicPath: 'http://localhost:8080/assets/',
      filename: 'bundle.js'
    },
    module: {
      loaders: [{
        exclude: /node_modules/,
        include: path.join(__dirname, '/frontend/src'),
        loader: 'react-hot'
      }, {
        exclude: /node_modules/,  //Use test?
        loader: 'babel',
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'sass']
      }]
    },
    resolve: {
      extensions: ['', '.react.js', '.js', '.jsx', '.scss']
    },
    devServer: {
      historyApiFallback: true,
      contentBase: './',
      hot: true,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ]
  }
} else {
  console.log('=== PRODUCTION BUILD ===')

  module.exports = {
    entry: [
      'babel-polyfill',
      './frontend/src/index.js',
    ],
    output: {
      path: path.join(__dirname,'ApiServer', 'public/js'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
      loaders: [{
        exclude: /node_modules/,  //Use test?
        loader: 'babel',
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader',['css', 'sass'].join('!'))
      }]
    },
    resolve: {
      extensions: ['', '.react.js', '.js', '.jsx', '.scss']
    },
    plugins: [
      new ExtractTextPlugin("../css/style.css"),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        }
      }),
      new webpack.optimize.OccurrenceOrderPlugin()
    ]
  }
}
