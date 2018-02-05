var gulp       	 = require('gulp'), // Подключаем Gulp
	sass         = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
	notify 		 = require('gulp-notify'),
	// run 		 = require('run-sequence'),
	changed  	 = require('gulp-changed'),
	plumber   	 = require('gulp-plumber');

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src(['app/sass/style.scss', 'app/sass/libs.scss']) // Берем источник
    .pipe(changed('src/css'))
    .pipe(plumber({
      errorHandler: notify.onError( function(err) {
        return {
          title:'Styles',
          message: err.message
        }
      })
    }))
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 10 versions', '> 1%'], { cascade: true })) // Создаем префиксы
		// .pipe(concat('style.css'))
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
    .pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении
});

gulp.task('css-libs', ['sass'], function() {
	return gulp.src(['!app/css/*.min.css', 'app/css/*.css']) // Выбираем файл для минификации
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('app/css')) // Выгружаем в папку app/css
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('js-libs', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'app/libs/jquery/dist/jquery.js', // Берем jQuery
		// 'app/libs/popper/dist/umd/popper.js',
		// 'app/libs/tether/dist/js/tether.js',
		// 'app/libs/bootstrap/js/dist/util.js',
		// 'app/libs/bootstrap/js/dist/tooltip.js',
		// 'app/libs/bootstrap/js/dist/popover.js',
    'app/libs/magnific-popup/dist/jquery.magnific-popup.js',
		// 'app/js/main.js' // Всегда в конце
		])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('js-main', function() {
	return gulp.src([
		'app/js/main.js' // Всегда в конце
		])
		.pipe(concat('main.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('watch', ['browser-sync', 'css-libs', 'js-libs', 'js-main'], function() {
	gulp.watch('app/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
  gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проектаs
	gulp.watch('app/js/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*') // Берем все изображения из app
		.pipe(cache(imagemin({ // С кешированием
		// .pipe(imagemin({ // Сжимаем изображения без кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))/**/)
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build', function(fn) {

  // run('clean', 'clear', 'img', 'sass', 'js', fn);

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'app/css/style.min.css',
		'app/css/libs.min.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);
