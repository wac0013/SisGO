const del = require("del"),
  gulp = require("gulp"),
  path = require("path"),
  gutil = require("gulp-util"),
  rename = require("gulp-rename"),
  webpack = require("webpack"),
  nodemon = require("gulp-nodemon"),
  typescript = require("gulp-typescript"),
  sourcemaps = require("gulp-sourcemaps"),
  webpackConfig = require("./webpack.config");

gulp.task("limpar", () => {
  return del.sync(["./dist/**"]);
});

gulp.task("copiar", () => {
  return gulp.src(["./client/static/**/*.*"]).pipe(gulp.dest("./dist/public/"));
});

gulp.task("build:server", () => {
  var tsConfig = typescript.createProject("tsconfig.json", {
    typescript: require("typescript")
  });
  var tsResult = tsConfig.src().pipe(tsConfig());

  return tsResult.js
    .pipe(
      rename(function(path) {
        path.dirname = path.dirname.replace("src", "");
      })
    )
    .pipe(gulp.dest("build/"));
});

gulp.task("build:client", cb => {
  webpack(webpackConfig, function(erro, status) {
    if (erro) {
      throw new gutil.PluginError("webpack:build", erro);
    }
    gutil.log(status);
    cb();
  });
});

gulp.task(
  "build",
  gulp.series(["limpar", "copiar", "build:client", "build:server"])
);

gulp.task("pro");

gulp.task("dev", gulp.series(["build"]));

gulp.task("default");
