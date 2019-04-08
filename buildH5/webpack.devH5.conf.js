const utils = require('./utils')
const webpack = require('webpack')
const config = require('../configH5')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.baseH5.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
// copy from ./webpack.prod.conf.js
const path = require('path')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

// add hot-reload related code to entry chunks
// Object.keys(baseWebpackConfig.entry).forEach(function (name) {
//   baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
// })
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: false })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') }
      ]
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../configH5/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

// module.exports = merge(baseWebpackConfig, {
//   module: {
//     rules: utils.styleLoaders({
//       sourceMap: config.dev.cssSourceMap,
//       extract: true
//     })
//   },
//   // cheap-module-eval-source-map is faster for development
//   // devtool: '#cheap-module-eval-source-map',
//   devtool: '#source-map',
//   output: {
//     path: config.build.assetsRoot,
//     // filename: utils.assetsPath('js/[name].[chunkhash].js'),
//     // chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
//     filename: utils.assetsPath('js/[name].js'),
//     chunkFilename: utils.assetsPath('js/[id].js')
//   },
//   plugins: [
//     new webpack.DefinePlugin({
//       'process.env': config.dev.env
//     }),

//     // copy from ./webpack.prod.conf.js
//     // extract css into its own file
//     new ExtractTextPlugin({
//       // filename: utils.assetsPath('css/[name].[contenthash].css')
//       filename: utils.assetsPath('css/[name].wxss')
//     }),
//     // Compress extracted CSS. We are using this plugin so that possible
//     // duplicated CSS from different components can be deduped.
//     new OptimizeCSSPlugin({
//       cssProcessorOptions: {
//         safe: true
//       }
//     }),
//     new webpack.optimize.CommonsChunkPlugin({
//       name: 'vendor',
//       minChunks: function (module, count) {
//         // any required modules inside node_modules are extracted to vendor
//         return (
//           module.resource &&
//           /\.js$/.test(module.resource) &&
//           module.resource.indexOf('node_modules') >= 0
//         ) || count > 1
//       }
//     }),
//     new webpack.optimize.CommonsChunkPlugin({
//       name: 'manifest',
//       chunks: ['vendor']
//     }),
//     // copy custom static assets
//     new CopyWebpackPlugin([
//       {
//         from: path.resolve(__dirname, '../static'),
//         to: config.build.assetsSubDirectory,
//         ignore: ['.*']
//       }
//     ]),

//     // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
//     // new webpack.HotModuleReplacementPlugin(),
//     new webpack.NoEmitOnErrorsPlugin(),
//     // https://github.com/ampedandwired/html-webpack-plugin
//     // new HtmlWebpackPlugin({
//     //   filename: 'index.html',
//     //   template: 'index.html',
//     //   inject: true
//     // }),
//     new FriendlyErrorsPlugin()
//   ]
// })
