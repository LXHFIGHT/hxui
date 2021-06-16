module.exports = {
  productionSourceMap: false,
  // 设置打开目录为 examples
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  chainWebpack: config => {
    // config // 打包情况汇报
    //   .plugin('webpack-bundle-analyzer')
    //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        // optional [svgo](https://github.com/svg/svgo) options
        svgo: {
          plugins: [
            { removeDoctype: true },
            { removeComments: true },
            { removeViewBox: false }
          ],
          removeViewBox: false
        }
      })
    config.module
      .rule('js')
      .include
      .add('/packages/')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 其他选项可以配置与此处
        return options
      })
  }
}