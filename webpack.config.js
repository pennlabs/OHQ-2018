const webpack = require('webpack')
const path    = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// require('dotenv').config()

const isProduction = process.env.NODE_ENV === 'production'

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
        test: /\.less$/,
        exclude: /node_modules/,
        loaders: ['style', 'css?modules&importLoaders=1', 'postcss', 'less']
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: /node_modules/,
        loader: 'file?name=images/[name].[ext]'
      }]
    },
    resolve: {
      extensions: ['', '.react.js', '.js', '.jsx', '.less']
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
      path: path.join(__dirname, 'ApiServer', 'public/js'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
      loaders: [{
        exclude: /node_modules/,  //Use test?
        loader: 'babel',
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', ['css?modules&importLoaders=1', 'postcss', 'less'].join('!'))
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: /node_modules/,
        loader: 'file?name=../images/[name].[ext]'
      }]
    },
    resolve: {
      extensions: ['', '.react.js', '.js', '.jsx', '.less']
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new ExtractTextPlugin('../css/style.css'),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        }
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
    ]
  }
}
