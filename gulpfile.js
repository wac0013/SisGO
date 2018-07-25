const
  del = require("del"),
  gulp          = require("gulp"),
  path          = require("path"),
  gutil         = require("gulp-util"),
  rename        = require("gulp-rename"),
  webpack       = require("webpack"),
  nodemon       = require("gulp-nodemon"),
  typescript    = require("gulp-typescript"),
  sourcemaps    = require("gulp-sourcemaps"),
  webpackConfig = require("./webpack.config");

gulp.task("limpar", () => {
  return del.sync(["./dist/**"]);
});

gulp.task("copiar-public", () => {
  return gulp.src(["./client/static/**/*.*"]).pipe(gulp.dest("./dist/public/"));
});

gulp.task("build", () => {
  let tsResult = gulp.src(["src/*"])
    .pipe(sourcemaps.init({largeFile: true}))
    .pipe(typescript(typescript.createProject("tsconfig.json", {
      typescript: require("typescript")
    })));

  return tsResult.js
    .pipe(sourcemaps.write(".", {includeContent: false, destPath: "build"}))
    .pipe(gulp.dest("build"));
});

gulp.task("build2", () => {
  var tsConfig = typescript.createProject("tsconfig.json", {
    typescript: require("typescript")
  });
  var tsResult = tsConfig.src().pipe(typescript(tsConfig));

  return tsResult.js
    .pipe(rename(function(path) {
      path.dirname = path.dirname.replace("src", "");
    }))
    .pipe(gulp.dest("build/"));
});

gulp.task("pro");

gulp.task("dev");

gulp.task("default");
