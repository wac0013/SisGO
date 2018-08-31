const del = require('del'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  merge = require('merge2'),
  webpack = require('webpack-stream'),
  nodemon = require('gulp-nodemon'),
  typescript = require('gulp-typescript'),
  sourcemaps = require('gulp-sourcemaps');

gulp.task('limpar', () => {
  return del(['./dist/']);
});

gulp.task('copiar', () => {
  return gulp.src(['./client/static/**/*']).pipe(gulp.dest('./dist/public/'));
});

gulp.task('build:server', () => {
  var tsConfig = typescript.createProject('./tsconfig.json');
  var ts = tsConfig
    .src()
    .pipe(sourcemaps.init({ largeFile: true }))
    .pipe(tsConfig());

  return merge([
    ts.js.pipe(sourcemaps.write('.')).pipe(gulp.dest('./build')),
    ts.dts.pipe(sourcemaps.write('.')).pipe(gulp.dest('./build/definitions'))
  ]);
});

gulp.task('build:client', () => {
  const config = require('./webpack.config.js');
  config.watch = true;
  const compiler = webpack(config);

  return gulp
    .src('client/src/main.js')
    .pipe(compiler)
    .pipe(gulp.dest('dist/public'));
});

gulp.task('build', gulp.series('limpar', 'copiar', 'build:client', 'build:server'));

gulp.task('nodemon', (done) => {
  const stream = nodemon({
    script: 'build\\main.js',
    ext: 'js',
    env: {
      NODE_ENV: 'dev',
      PORT: 3000
    },
    watch: ['build\\main.js', 'webpack.config.js'],
    exec: 'node --inspect=9229',
    delay: '5000'
  });

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
  gulp
    .watch('./client/', gulp.series('copiar'))
    .on('change', () => {
      gutil.log('arquivos do client alterados!');
    })
    .on('error', () => {
      gutil.log('erro ao recompilar servidor');
    });
});

gulp.task('pro');

gulp.task('dev', gulp.series('build:server', 'nodemon', 'monitorar'));
