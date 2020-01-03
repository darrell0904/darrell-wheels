const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //每次构建清理dist目录
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 模式配置
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  // 入口文件
  entry: {
    pagination: './src/index.ts'
  },
  // 出口文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "darrellWheels.min.js",
    libraryTarget: 'umd',
    library: 'darrellWhells'
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.json']
  },
  // 对应的插件
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
    }),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i
    })
  ],
  // 开发服务器配置
  devServer: {},
  // 处理对应模块
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname , 'src'),
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      },
      {
        test: /\.(ts|tsx)$/,
        include: path.join(__dirname , 'src'),
        exclude: /(node_modules|bower_components)/,
        use: ['ts-loader']
      },
      {
        test: /\.(ts|tsx)?$/,
        include: path.join(__dirname , 'src'),
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'tslint-loader',
          options: {},
        }],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader'
        }]
      },
      {
        test: /\.(eot|woff2?|woff|ttf|svg|otf)$/,
        use: ['file-loader'],
      }
    ]
  }
}

/**
 * 使用 typescript 
 * 
 */
