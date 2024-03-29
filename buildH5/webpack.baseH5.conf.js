const path = require('path')
// var fs = require('fs')
const utils = require('./utils')
const config = require('../configH5')
const vueLoaderConfig = require('./vue-loader.conf')
// var MpvuePlugin = require('webpack-mpvue-asset-plugin')
// const glob = require('glob')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/mainH5.js'
    // app: './module/' + enterdir + '/src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? '.' + config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.html'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,

        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('img/[name].[ext]?v=[hash:7]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('media/[name].[ext]?v=[hash:7]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]?v=[hash:7]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

// function getEntry (rootSrc, pattern) {
//   var files = glob.sync(path.resolve(rootSrc, pattern))
//   return files.reduce((res, file) => {
//     var info = path.parse(file)
//     var key = info.dir.slice(rootSrc.length + 1) + '/' + info.name
//     res[key] = path.resolve(file)
//     return res
//   }, {})
// }

// const appEntry = { app: resolve('./src/main.js') }
// const pagesEntry = getEntry(resolve('./src'), 'pages/**/main.js')
// const entry = Object.assign({}, appEntry, pagesEntry)

// module.exports = {
//   // 如果要自定义生成的 dist 目录里面的文件路径，
//   // 可以将 entry 写成 {'toPath': 'fromPath'} 的形式，
//   // toPath 为相对于 dist 的路径, 例：index/demo，则生成的文件地址为 dist/index/demo.js
//   entry,
//   target: require('mpvue-webpack-target'),
//   output: {
//     path: config.build.assetsRoot,
//     filename: '[name].js',
//     publicPath: process.env.NODE_ENV === 'production'
//       ? config.build.assetsPublicPath
//       : config.dev.assetsPublicPath
//   },
//   resolve: {
//     extensions: ['.js', '.vue', '.json'],
//     alias: {
//       'vue': 'mpvue',
//       '@': resolve('src')
//     },
//     symlinks: false,
//     aliasFields: ['mpvue', 'weapp', 'browser'],
//     mainFields: ['browser', 'module', 'main']
//   },
//   module: {
//     rules: [
//       {
//         test: /\.vue$/,
//         loader: 'mpvue-loader',
//         options: vueLoaderConfig
//       },
//       {
//         test: /\.js$/,
//         include: [resolve('src'), resolve('test')],
//         use: [
//           'babel-loader',
//           {
//             loader: 'mpvue-loader',
//             options: {
//               checkMPEntry: true
//             }
//           },
//         ]
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
//         loader: 'url-loader',
//         options: {
//           limit: 10000,
//           name: utils.assetsPath('img/[name].[ext]')
//         }
//       },
//       {
//         test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
//         loader: 'url-loader',
//         options: {
//           limit: 10000,
//           name: utils.assetsPath('media/[name].[ext]')
//         }
//       },
//       {
//         test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
//         loader: 'url-loader',
//         options: {
//           limit: 10000,
//           name: utils.assetsPath('fonts/[name].[ext]')
//         }
//       }
//     ]
//   },
//   plugins: [
//     new MpvuePlugin()
//   ]
// }
