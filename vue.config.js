var path = require('path')
function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/',
  productionSourceMap: false,
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