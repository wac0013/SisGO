const del = require('del'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  merge = require('merge2'),
  ghPages = require('gulp-gh-pages'),
  webpack = require('webpack'),
  nodemon = require('gulp-nodemon'),
  typescript = require('gulp-typescript'),
  sourcemaps = require('gulp-sourcemaps'),
  WebpackDevServer = require('webpack-dev-server');

gulp.task('limpar', () => {
  return del(['./dist/', './build/']);
});

gulp.task('copiar', () => {
  return gulp.src(['./client/static/**/*']).pipe(gulp.dest('./dist/public/'));
});

gulp.task('build:server', () => {
  var tsConfig = typescript.createProject('./tsconfig.json');
  var ts = gulp.src(['src/**/*.ts'], {base: 'src'})
    .pipe(sourcemaps.init({ largeFile: true }))
    .pipe(tsConfig());

  return merge([
    ts.js
      .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '../src' }))
      .pipe(gulp.dest('./build')),
    ts.dts
      .pipe(gulp.dest('./build/definitions'))
  ])
});

gulp.task('build:client', (done) => {
  const config = require('./webpack.config.js');
  config.output.path = '/SisGO/';

  webpack(config, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log(
      '[webpack]',
      stats.toString({
        colors: true,
        env: true,
        publicPath: true,
        errorDetails: true,
        errors: true,
        warnings: true,
        modulesSort: true
      })
    );
    done();
  });
});

gulp.task('dev:client', () => {
  process.env.NODE_ENV = 'dev';
  const config = require('./webpack.config.js');
  const compiler = webpack(config);

  new WebpackDevServer(compiler, config.devServer).listen(8080, 'localhost', function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
  });
});

gulp.task('deploy', () => {
  return gulp.src('./dist/public/**/*').pipe(ghPages({ force: true }));
});

gulp.task('nodemon', (done) => {
  let conf = require('./nodemon.json');
  const stream = nodemon(conf);

  stream
    .on('restart', function() {
      gutil.log('Reiniciando');
    })
    .on('crash', function() {
      gutil.log('Aplicação parou de funcionar!\n');
      stream.emit('restart', 10);
    })
    .on('start', done);
});

gulp.task('monitorar', () => {
  gulp
    .watch('./src/', { delay: 2000 }, gulp.series('build:server'))
    .on('change', () => {
      gutil.log('recompilando servidor!');
    })
    .on('error', () => {
      gutil.log('erro ao recompilar servidor');
    });
});

gulp.task('dev', gulp.series('limpar', 'build:server', /*'nodemon',*/ gulp.parallel('dev:client', 'monitorar')));

gulp.task('default', gulp.series('limpar', 'build:server', 'build:client', 'deploy'));
