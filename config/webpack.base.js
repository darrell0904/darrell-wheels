const path = require('path');

module.exports = {
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      }, {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: ['tslint-loader'],
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader'
        }]
      }, {
        test: /\.(eot|woff2?|woff|ttf|svg|otf)$/,
        use: ['file-loader'],
      }
    ]
  },
};
