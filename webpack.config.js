const path = require('path'),
  webpack = require('webpack'),
  DashboardPlugin = require('webpack-dashboard/plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  VueLoaderPlugin = require('vue-loader/lib/plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin');
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
    new CopyWebpackPlugin(
      [
        { from: 'client/static/css/*.min.css', to: 'dist/public/css/[name].css', force: true },
        { from: 'client/static/font/**/*', to: 'dist/public/font/', force: true },
        { from: 'client/static/img/**/*', to: 'dist/public/img/', force: true },
        { from: 'client/static/js/*.min.js', to: 'dist/public/js/[name].js', force: true },
        { from: 'client/static/view/*.min.js', to: 'dist/public/index.html', force: true }
      ],
      { debug: 'debug' }
    ),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new VueLoaderPlugin()
  ]
};

if (process.env.NODE_ENV === 'production' || 'pro') {
  module.exports.devtool = '#source-map';
  module.exports.mode = 'production';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    /* new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }), */
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
} else if (process.env.NODE_ENV === 'development' || 'dev') {
  module.exports.devtool = '#eval-source-map';
  module.exports.mode = 'development';
  // http://vue-loader.vuejs.org/en/workflow/production.html
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
    // new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, './client/static/view/index.html'),
      inject: true
    })
  ]);
}
