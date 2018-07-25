const gulp    = require('gulp'),
  path        = require('path'),
  gutil       = require('gulp-util'),
  del         = require('del'),
  ts          = require('gulp-typescript'),
  sourcemaps  = require('gulp-sourcemaps'),
  webpack     = require('webpack'),
  nodemon     = require('gulp-nodemon'),
  config      = require('./config'),
  gtb         = require('gulp-typescript-babel'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  webpackConfig     = Object.create(require('./app/webpack.config.js')),
  WebpackDevServer  = require('webpack-dev-server')

//
gulp.task('copiar-public', () => {
  return gulp.src(['./app/static/**/*.*'])
    .pipe(gulp.dest('./dist/public/'))
})
//
gulp.task('copiar-conf', () => {
  return gulp.src(['./server/src/config/*.*'])
    .pipe(gulp.dest('./dist/server/config'))
})
//
gulp.task('limpar', () => {
  return del.sync(['./dist/**'])
})
//
gulp.task('copiar', gulp.parallel('limpar', 'copiar-public', 'copiar-conf'))
//
gulp.task('compilar-servidor', () => {
  let tsResult = gulp.src(['server/src/**/*.ts', 'server/src/*.ts'])
    .pipe(sourcemaps.init({largeFile: true}))
    .pipe(ts({
      moduleResolution: 'node',
      module: 'commonjs',
      target: 'ES6',
      allowJs: true,
      rootDir: __dirname,
      outDir: 'dist/server',
      removeComments: true,
      preserveConstEnums: true,
      locale: 'pt-BR',
      newLine: 'crlf',
      noEmitOnError: true,
      pretty: true,
      experimentalDecorators: true,
      emitDecoratorMetadata: true
    }))

  return tsResult.js
    .pipe(sourcemaps.write('.', {includeContent: false, destPath: 'dist/server'}))
    .pipe(gulp.dest('dist/server'))
})
//
gulp.task('compilar', () => {
  gulp.src(['server/src/**/*.ts', 'server/src/*.ts'])
    .pipe(sourcemaps.init({largeFile: true}))
    .pipe(gtb({
      config: {
        moduleResolution: 'node',
        module: 'commonjs',
        target: 'ES6',
        allowJs: true,
        rootDir: __dirname,
        outDir: 'dist/server',
        removeComments: true,
        preserveConstEnums: true,
        locale: 'pt-BR',
        newLine: 'crlf',
        noEmitOnError: true,
        pretty: true,
        experimentalDecorators: true,
        emitDecoratorMetadata: true
      },
      incremental: true
    },
    {
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write('.', {includeContent: false, destPath: 'dist/server'}))
    .pipe(gulp.dest('dist/server'))
})
//
gulp.task('app-build', function(callback) {
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env': config.env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'app/static'),
        to: path.join(__dirname, 'dist/public'),
        ignore: ['*.html']
      }
    ])
  )

  webpack(webpackConfig, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: true,
      chunkModules: false
    }) + '\n\n')
    callback()
  })
})
//
gulp.task('app-dev', (cb) => {
  const webpackConfig   = require('./app/webpack.config');
  const compiler        = require('webpack')(webpackConfig);
  webpackConfig.entry.unshift('webpack-dev-server/client?http://' + config().host + ':' + config().porta_cliente + '/', 'webpack/hot/dev-server');

  new WebpackDevServer(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.join(__dirname, 'dist/public'),
    stats: {
      colors: true
    },
    hot: true,
    open: true,
    historyApiFallback: true,
    clientLogLevel: 'info',
    quiet: true
  }).listen(config().porta_cliente, config().host, function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('> Iniciando aplicação em modo desenvolvimento...');
    gutil.log('[webpack-dev-server]', 'http://' + config().host + ':' + config().porta_cliente + '/webpack-dev-server/index.html');
  })
  cb()
})
//
gulp.task('monitorar-public', function(done) {
  gulp.watch(['app/static/*.*', 'app/static/**/*.*'], gulp.series('copiar-public'));
  done();
})
//
gulp.task('debug-server', function(done) {
  nodemon({
    script: './dist/server/servidor.js',
    ext: 'js html json ts',
    watch: ['server'],
    ignore: ['dist/server/node_modules'],
    execMap: {js: 'node --harmony --inspect=9999'},
    env: {'NODE_ENV': 'development'},
    tasks: ['compilar-servidor']
  })
  done();
})
//
gulp.task('dev', gulp.series('copiar-public', 'app-dev', 'compilar-servidor', gulp.parallel('monitorar-public', 'debug-server')))
