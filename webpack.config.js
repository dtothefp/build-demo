var path = require('path');
var webpack = require('webpack');
var nunjucks = require('nunjucks');

var env = nunjucks.configure({
  noCache: true,
  watch: false
});

var userName = process.cwd().split('/')[2];
var fileLoader = 'file-loader?name=[path][name].[ext]';

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    bundle: './index.js',
  },
  output: {
    filename: '[name].js',
    path: './dist'
  },
  externals: {
    jquery: 'jQuery'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: function(fp) {
          return /node_modules/.test(fp);
        },
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: fileLoader
      },
      {
        test: /\.html$/,
        loader: 'template-html-loader',
        query: {
          engine: 'nunjucks',
          raw: true,
          userName: userName
        }
      }
    ]
  },
  plugin: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      'window.jQuery': 'jquery',
      'jQuery': 'jquery'
    })
  ]
}
