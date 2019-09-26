const SIZE_KB = 1024
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: ['./src/index.js', './src/scss/index.scss'],
  output: {
    filename: 'hxui.common.js',
    path: path.resolve(__dirname, 'lib'),
    publicPath: '/lib'
  },
  mode: 'none',
  resolve: {
    extensions: ['.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env', '@vue/babel-preset-app' ]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|jpg|webp|png|jpeg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8 * SIZE_KB
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'hxui.common.css'
    }),
    new VueLoaderPlugin(),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions:{
        preset: [ 'default', { discardComments: { removeAll:true } } ]
      },
      canPrint: false
    })
  ]
}