var gulp = require('gulp'), // Подключаем Gulp
  sass = require('gulp-sass'), //Подключаем Sass пакет,
  browserSync = require('browser-sync'), // Подключаем Browser Sync
  concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
  uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
  cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
  rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
  del = require('del'), // Подключаем библиотеку для удаления файлов и папок
  imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
  pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
  cache = require('gulp-cache'), // Подключаем библиотеку кеширования
  autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
  notify = require('gulp-notify'),
  // run 		 = require('run-sequence'),
  changed = require('gulp-changed'),
  plumber = require('gulp-plumber');

gulp.task('styles', function () { // Создаем таск Sass
  return gulp.src('app/sass/style.scss') // Берем источник
  // .pipe(changed('app/css'))
    .pipe(plumber({
      errorHandler: notify.onError(function (error) {
        return {
          title: 'Styles',
          message: error.message
        }
      })
    }))
    .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
    .pipe(autoprefixer(['last 10 versions', '> 1%'], {cascade: true})) // Создаем префиксы
    // .pipe(concat('style.css')) // Соедение файлов и задание названия
    .pipe(rename('style.css')) // Задание названия
    .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
    .pipe(cssnano()) // Сжимаем
    .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
    .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
    .pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении
});

gulp.task('css-libs', function () {
  return gulp.src('app/sass/libs.scss') // Выбираем файл
    .pipe(sass())
    .pipe(cssnano()) // Сжимаем
    .pipe(rename('libs.min.css')) // Добавляем суффикс .min
    .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('browser-sync', function () { // Создаем таск browser-sync
  browserSync({ // Выполняем browserSync
    server: { // Определяем параметры сервера
      baseDir: 'app' // Директория для сервера - app
    },
    notify: false // Отключаем уведомления
  });
});

gulp.task('js-main', function () {
  return gulp.src([
    'app/js/main.js' // Всегда в конце
  ])
    .pipe(plumber({
      errorHandler: notify.onError(function (error) {
        return {
          title: 'js-main',
          message: error.message
        }
      })
    }))
    .pipe(uglify()) // Сжимаем JS файл
    .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
    .pipe(gulp.dest('app/js')) // Выгружаем в папку app/js
    .pipe(browserSync.reload({stream: true})); // Обновляем JS на странице при изменении
});

gulp.task('js-libs', function () {
  return gulp.src([ // Берем все необходимые библиотеки
    'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
    // 'app/libs/bootstrap/dist/js/bootstrap.js',
    'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
    'app/libs/font-awesome/svg-with-js/js/fontawesome-all.min.js',
    'app/libs/jssocials/dist/jssocials.js',
    'app/libs/country-select-js/build/js/countrySelect.js',
    // 'app/js/main.js' // Всегда в конце
  ])
    .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
    .pipe(uglify()) // Сжимаем JS файл
    .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('watch', ['browser-sync', 'css-libs', 'styles', 'js-libs', 'js-main'], function () {
  gulp.watch('app/sass/**/*.scss', ['styles']); // Наблюдение за sass файлами в папке sass
  gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
  gulp.watch('app/js/*.js', ['js-main']);   // Наблюдение за JS файлами в папке js
  gulp.watch('app/**/*.php', browserSync.reload);   // Наблюдение за PHP файлами
  // gulp.watch('app/php/*.php', browserSync.reload);
});

gulp.task('clean', function () {
  return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function () {
  return gulp.src('app/img/**/*') // Берем все изображения из app
    .pipe(cache(imagemin({ // С кешированием
      // .pipe(imagemin({ // Сжимаем изображения без кеширования
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))/**/)
    .pipe(gulp.dest('dist/img')); // Выгружаем на продакшн
});

gulp.task('build', ['clean', 'clear', 'styles', 'css-libs', 'js-libs', 'js-main'], function () {

// gulp.task('build', function(fn) {
  // run('clean', 'clear', 'img', 'sass', 'js', fn);

  var buildCss = gulp.src([ // Переносим CSS в продакшн
    'app/css/*.css',
    '!app/css/libs.css'
  ])
    .pipe(gulp.dest('dist/css'))

  var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшн
    .pipe(gulp.dest('dist'))

  var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшн
    .pipe(gulp.dest('dist/fonts'))

  var buildFonts = gulp.src('app/img/**/*') // Переносим картинки в продакшн
    .pipe(gulp.dest('dist/img'))

  var buildJs = gulp.src('app/js/**/*') // Переносим js скрипты в продакшн
    .pipe(gulp.dest('dist/js'))

  var buildJs = gulp.src('app/php/**/*') // Переносим php скрипты в продакшн
    .pipe(gulp.dest('dist/php'))

  var buildJs = gulp.src('app/*.php') // Переносим php страницы и скрипты в продакшн
    .pipe(gulp.dest('dist'))

});

gulp.task('clear', function (callback) {
  return cache.clearAll();
});

gulp.task('default', ['watch']);
