import path from 'path';
import webpack from 'webpack';
import nunjucks from 'nunjucks';

const env = nunjucks.configure({
  noCache: true,
  watch: false
});

const userName = process.cwd().split('/')[2];
const fileLoader = 'file-loader?name=[path][name].[ext]';

export default function({isDev, src, dest}) {
  return {
    context: path.join(process.cwd(), src),
    entry: {
      bundle: './index.js',
    },
    output: {
      filename: '[name].js',
      path: dest
    },
    externals: {
      jquery: 'window.jQuery'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: function(fp) {
            return /node_modules/.test(fp);
          },
          loader: 'babel-loader?stage=0'
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
        'global.$': 'jquery',
        'window.$': 'jquery'
      })
    ]
  };
}
