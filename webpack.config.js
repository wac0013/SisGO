const path = require('path'),
  // fs = require('fs'),
  webpack = require('webpack'),
  DashboardPlugin = require('webpack-dashboard/plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  VueLoaderPlugin = require('vue-loader/lib/plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');
// FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  entry: ['./client/src/main.js', 'webpack-hot-middleware/client?overlay=false'],
  output: {
    path: path.resolve(__dirname, './dist/public'),
    publicPath: '/',
    filename: 'js/[name][hash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['vue-style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]'
        }
      },
      {
        test: /\.ttf$|\.woff$|\.woff2$|\.eot$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the 'scss' and 'sass' values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
            less: 'vue-style-loader!css-loader!less-loader'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.ts', '.tsx', 'jsx', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '../../theme.config': path.join(__dirname, 'client/src/semantic-config/tema.config'),
      Componentes: path.join(__dirname, 'client/src/componentes/'),
      Elementos: path.join(__dirname, 'client/src/componentes/elementos/'),
      Colecoes: path.join(__dirname, 'client/src/componentes/colecoes/'),
      Modulos: path.join(__dirname, 'client/src/componentes/modulos/'),
      Exibicoes: path.join(__dirname, 'client/src/componentes/exibicoes/'),
      Telas: path.join(__dirname, 'client/src/telas/')
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { watch: true }),
    new CopyWebpackPlugin([
      { from: 'client/static/manifest.json', to: path.resolve(__dirname, './dist/public'), force: true },
      { from: 'client/static/css/', to: 'css/', force: true, ignore: ['*.gitkeep'] },
      { from: 'client/static/js/', to: 'js/', force: true, ignore: ['*.gitkeep'] },
      { from: 'client/static/img/', to: 'img/', force: true, ignore: ['*.gitkeep'] },
      { from: 'client/static/font/', to: 'font/', force: true, ignore: ['*.gitkeep'] },
      { from: 'client/static/view/', to: path.resolve(__dirname, './dist/public'), force: true }
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      jQuery: 'jquery'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    }),
    new VueLoaderPlugin()
  ]
};

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev') {
  module.exports.devtool = '#eval-source-map';
  module.exports.mode = 'development';
  module.exports.watch = true;
  module.exports.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: true,
    headers: { 'Access-Control-Allow-Origen': '*' },
    stats: 'minimal',
    port: 8080
  };
  /* https: {
      key: fs.readFileSync(join(__dirname, '../certificado/server.key')),
      cert: fs.readFileSync(join(__dirname, '../certificado/server.crt'))
    }, */
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'"
      },
      development: true
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
  module.exports.watch = false;
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
