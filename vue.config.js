var path = require('path')
function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  chainWebpack: config => {
    config // 如果不需要打包接口汇报，则注释调本行配置
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
	configureWebpack: config => {
    config.resolve = {
			extensions: ['.js', '.vue', '.json'],
			alias: {
				'@': resolve('src'),
			}
    }
    config.externals = {
      'vue': 'Vue',
      'axios': 'axios',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex'
    }
  }
}