const path = require('path'),
  webpack = require('webpack'),
  DashboardPlugin = require('webpack-dashboard/plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  VueLoaderPlugin = require('vue-loader/lib/plugin');
// FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  entry: ['./client/src/main.js', 'webpack-hot-middleware/client?overlay=false'],
  output: {
    path: path.resolve(__dirname, './dist/public'),
    publicPath: '/',
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the 'scss' and 'sass' values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { watch: true }),
    new CopyWebpackPlugin([
      { from: 'client/static/manifest.json', to: path.resolve(__dirname, './dist/public'), force: true },
      { from: 'client/static/css/', to: 'css/', force: true },
      { from: 'client/static/js/', to: 'js/', force: true },
      { from: 'client/static/img/', to: 'img/', force: true },
      { from: 'client/static/font/', to: 'font/', force: true },
      { from: 'client/static/view/', to: path.resolve(__dirname, './dist/public'), force: true }
    ]),
    new VueLoaderPlugin()
  ]
};

if (process.env.NODE_ENV === 'development' || 'dev') {
  module.exports.devtool = '#eval-source-map';
  module.exports.mode = 'development';
  module.exports.watch = true;
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'development'
      }
    }),
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, './client/static/view/index.html'),
      inject: true
    })
  ]);
} else {
  module.exports.devtool = '#source-map';
  module.exports.mode = 'production';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, './client/static/view/index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]);
}
