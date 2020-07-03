var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var clean = require('gulp-dest-clean');
var src = 'app';


var config = {
    paths: {
        scss: src + '/scss/**/*.scss',
        css: src + '/css/**/*.css',
        html: src + '/*.html',
        js: src + '/**/*.js'
    },
    output: {
        nameFileCss: 'main.css',
        pathCss: src + '/css',
        pathDistCss: 'dist/css',
        pathDistHtml: 'dist'
    },
    srv_options: {
        basePath: src
    }
};

gulp.task('sass', function (done) {
    gulp.src(config.paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(concat(config.output.nameFileCss))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.output.pathCss))
        .pipe(browserSync.stream());

    done();
});

gulp.task('min-css', function () {
    return gulp.src(config.paths.css)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(config.output.pathDistCss));
});

gulp.task('min-html', function () {
    return gulp.src(config.paths.html)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(config.output.pathDistHtml));
});

gulp.task('clean', function () {

    return gulp.src('dist')
        .pipe(clean('dist'));
});

gulp.task('buildCss', function () {

    return gulp.src(config.paths.css)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(config.output.pathDistCss));
});

gulp.task('buildFonts', function () {

    return gulp.src(src + '/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('buildJs', function () {

    return gulp.src(src + '/js/**/*')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('buildLibsJs', function () {

    return gulp.src(src +'/libs/**/*')
        .pipe(gulp.dest('dist/libs'));
});

gulp.task('buildHtml', function () {
    return gulp.src(src +'/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));
});

gulp.task('buildImages', function () {
    return gulp.src(src +'/images/**/*') // Переносим изображения в продакшен
        .pipe(gulp.dest('dist/images'));
});

gulp.task('build', gulp.series('clean', 'sass', gulp.parallel('buildCss', 'buildFonts', 'buildJs', 'buildLibsJs', 'buildHtml', 'buildImages')));

gulp.task('serve', function (done) {

    browserSync.init({
        server: src
    });

    gulp.watch(config.paths.scss, gulp.series('sass'));
    gulp.watch(config.paths.js).on('change', () => {
        browserSync.reload();
        done();
    });
    gulp.watch(config.paths.html).on('change', () => {
        browserSync.reload();
        done();
    });

    done();
});

gulp.task('default', gulp.series('sass', 'serve'));
