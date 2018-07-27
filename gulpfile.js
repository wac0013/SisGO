const del = require("del"),
  gulp = require("gulp"),
  gutil = require("gulp-util"),
  rename = require("gulp-rename"),
  webpack = require("webpack"),
  nodemon = require("gulp-nodemon"),
  typescript = require("gulp-typescript"),
  // sourcemaps = require("gulp-sourcemaps"),
  webpackConfig = require("./webpack.config");

gulp.task("limpar", (cb) => {
  del(["./dist/"]);
  cb();
});

gulp.task("copiar", () => {
  return gulp.src(["./client/static/"]).pipe(gulp.dest("./dist/public/"));
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
  webpack(webpackConfig, function(erro) {
    if (erro) {
      throw new gutil.PluginError("webpack:build", erro);
    }
    cb();
  });
});

gulp.task(
  "build",
  gulp.series("limpar", "copiar", "build:client", "build:server")
);

gulp.task("nodemon", (cb) => {
  const stream = nodemon({
    script: "./build/main.js",
    ext: "js",
    env: {
      NODE_ENV: "dev",
      PORT: 3000
    },
    watch: "./build",
    done: cb
  });

  stream.on("restart", function() {
    console.log("Reiniciando");
  }).on("crash", function() {
    console.error("Aplicação parou de funcionar!\n");
    stream.emit("restart", 10);
  });

  cb();
});

gulp.watch();

gulp.task("pro");

gulp.task("dev", gulp.series("build"));

gulp.task("default");
