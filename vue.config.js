const path = require('path')
const webpack = require('webpack')
const resolve = dir => path.join(__dirname, dir)
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// 打包时 忽略以下命名空间（cdn 方式引入）
const namespaces = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  vant: 'vant'
}

const externals = IS_PROD ? namespaces : {}

// cdn 配置
const cdn = {
  css: ['//cdn.jsdelivr.net/npm/vant@2.9/lib/index.css'],
  js: [
    '//cdn.jsdelivr.net/npm/vue/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios/dist/axios.min.js',
    '//cdn.jsdelivr.net/npm/vant@2.9/lib/vant.min.js'
  ]
}

module.exports = {
  configureWebpack: config => {
    const plugins = []
    if (IS_PROD) {
      // Gzip
      const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    config.plugins = [...config.plugins, ...plugins]
    config.externals = externals
  },
  productionSourceMap: !IS_PROD,
  chainWebpack: config => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))

    if (IS_PROD) {
      // 打包 cdn 版本
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })

      // 打包分析
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }

    // 删除 moment 除 zh-cn 中文包外的其它语言包，无需在代码中手动引入 zh-cn 语言包。
    config.plugin('ignore').use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/))

    return config
  },
  css: {
    extract: IS_PROD,
    sourceMap: false
  }
}
