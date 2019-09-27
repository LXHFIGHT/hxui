module.exports = {
  // 设置打开目录为 examples
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  chainWebpack: config => {
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