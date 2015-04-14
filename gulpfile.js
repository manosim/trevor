var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var path = require('path');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');


gulp.task('concat', function() {
  return gulp.src([
      './www/js/app.js',
      './www/js/controllers.js',
      './www/js/controllers/*.js',
      './www/js/services.js',
      './www/js/services/*.js',
      './www/js/filters.js',
      './www/js/filters/*.js',
      './www/lib/ansi2html.js',
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./www/js/dist/'));
});


gulp.task('remove-logs', ['concat'], function () {
    return gulp.src('./www/js/dist/main.js')
    .pipe(stripDebug())
    .pipe(gulp.dest('./www/js/dist/'));
});


gulp.task('uglify', ['remove-logs'], function() {
  gulp.src('./www/js/dist/main.js')
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./www/js/dist/'));
});


gulp.task('less', function () {
  gulp.src('./www/less/**.less')
    .pipe(plumber())
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./www/css/'));
});


gulp.task('jshint', function() {
  return gulp.src(['./www/js/**/*.js', '!./www/js/dist/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});


gulp.task('watch', function() {
  gulp.watch('./www/less/**.less', ['less']);
  gulp.watch('./www/js/**/*.js', ['concat']);
});


var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});


gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});


gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('release', ['less', 'concat', 'remove-logs', 'uglify']);
gulp.task('test', ['jshint']);