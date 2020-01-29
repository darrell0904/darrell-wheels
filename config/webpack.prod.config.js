const path = require('path');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./webpack.base.js'); // 引用公共配置

const prodConfig = {
  mode: 'production', // 生产模式
  devtool: 'cheap-module-source-map',
  entry: path.join(__dirname, "../src/index.ts"), // 项目入口，处理资源文件的依赖关系
  output: { // 出口文件
    path: path.resolve(__dirname, '../lib/'),
    filename: "index.js",
    libraryTarget: 'umd',     // 采用通用模块定义
    library: 'darrellWhells'
  },
  plugins: [
    new UglifyJsPlugin({
      test: /\.js($|\?)/i
    }),
  ],
  module: {
  }
};

module.exports = merge(prodConfig, baseConfig); // 将baseConfig和devConfig合并为一个配置