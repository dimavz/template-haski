var gulp     = require('gulp'),
		sass     = require('gulp-sass'),
		browser  = require('browser-sync'),
		concat   = require('gulp-concat'),
		uglify   = require('gulp-uglifyjs'),
		cssnano  = require('gulp-cssnano'),
		rename   = require('gulp-rename'),
		del      = require('del'),
		imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
		pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
		cache = require('gulp-cache'), // Подключаем библиотеку кеширования
		autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

/* Пример Таска

gulp.task('mytask', function(){
	return gulp.src('source-files')
	.pipe(plugin())
	.pip(gulp.dest(folder))
	});

*/

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
	.pipe(gulp.dest('app/css'))
	.pipe(browser.reload({stream: true}))
});

gulp.task('scripts', function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js', 
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
} );

gulp.task('csslibs',['sass'], function(){
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css/'));
});

gulp.task('browser', function(){
	browser({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('clean', function(){
	return del.sync('dist');
});

gulp.task('clear', function (callback) {
	return cache.clearAll();
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*') // Берем все изображения из app
		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('watch',['browser','csslibs', 'scripts'], function(){
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/**/*.html', browser.reload);
	gulp.watch('app/js/**/*.js', browser.reload);
	gulp.watch('app/css/**/*.css', browser.reload);

});

gulp.task('build',['clean','img', 'sass','scripts'], function(){
	var buildCSS = gulp.src([
			'app/css/main.css',
			'app/css/libs.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));

	var buildJS = gulp.src('app/js/**/*').pipe(gulp.dest('dist/js'));

	var buildHTML = gulp.src('app/*html').pipe(gulp.dest('dist'));
});

gulp.task('default',['watch']);



	