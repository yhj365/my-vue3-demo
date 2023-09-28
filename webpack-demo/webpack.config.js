const { Configuration } = require('webpack')
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { Visualizer } = require('rollup-plugin-visualizer')

/**
 * @type {Configuration}
 */
const config = {
  mode: 'development',
  entry: './src/main.ts',
  devServer: {
    port: 8080,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    // 自动补齐后缀
    extensions: ['.vue', '.js', '.ts', '.json', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(process.cwd(), 'tsconfig.json'),
          appendTsSuffixTo: [/\.vue$/],
        },
      },
    ],
  },
  output: {
    filename: '[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  stats: 'errors-only',
  plugins: [
    new htmlWebpackPlugin({
      template: './public/index.html',
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    // 美化webpack启动内容
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['Your application is running here: http://localhost:8080'],
      },
    }),
    // 性能检测
    new Visualizer(),
  ],
}

module.exports = config
