const utils = require('./utils')
const config = require('../configH5')
const isProduction = process.env.NODE_ENV === 'production'// new
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

// for mp
// var isProduction = true

// module.exports = {
//   loaders: utils.cssLoaders({
//     sourceMap: isProduction
//       ? config.build.productionSourceMap
//       : config.dev.cssSourceMap,
//     extract: isProduction
//   }),
//   transformToRequire: {
//     video: 'src',
//     source: 'src',
//     img: 'src',
//     image: 'xlink:href'
//   }
// }

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
