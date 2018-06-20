const gulp = require('gulp'), // Подключаем Gulp
  sass = require('gulp-sass'), //Подключаем Sass пакет,
  browserSync = require('browser-sync'), // Подключаем Browser Sync
  concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
  uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
  csso = require('gulp-csso'), // Подключаем пакет для минификации CSS
  rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
  del = require('del'), // Подключаем библиотеку для удаления файлов и папок
  imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
  pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
  cache = require('gulp-cache'), // Подключаем библиотеку кеширования
  autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
  notify = require('gulp-notify'),
  run 		 = require('run-sequence'),
  changed = require('gulp-changed'),
  plumber = require('gulp-plumber');

gulp.task('styles', function () { // Создаем таск Sass
  return gulp.src('src/sass/style.scss') // Берем источник
  // .pipe(changed('src/css'))
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
    .pipe(gulp.dest('src/css')) // Выгружаем результата в папку src/css
    .pipe(csso()) // Сжимаем
    .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
    .pipe(gulp.dest('src/css')) // Выгружаем результата в папку src/css
    .pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении
});

gulp.task('css-libs', function () {
  return gulp.src('src/sass/libs.scss') // Выбираем файл
    .pipe(sass())
    .pipe(csso()) // Сжимаем
    .pipe(rename('libs.min.css')) // Добавляем суффикс .min
    .pipe(gulp.dest('src/css')); // Выгружаем в папку src/css
});

gulp.task('browser-sync', function () { // Создаем таск browser-sync
  browserSync.init({ // Выполняем browserSync
    server: { // Определяем параметры сервера
      baseDir: 'src' // Директория для сервера - src
    },
    notify: false // Отключаем уведомления
  });
});

gulp.task('js-main', function () {
  return gulp.src([
    'src/js/main.js' // Всегда в конце
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
    .pipe(gulp.dest('src/js')) // Выгружаем в папку src/js
    .pipe(browserSync.reload({stream: true})); // Обновляем JS на странице при изменении
});

gulp.task('js-libs', function () {
  return gulp.src([ // Берем все необходимые библиотеки
    'src/libs/jquery/dist/jquery.min.js', // Берем jQuery
    'src/libs/jquery-ui/jquery-ui.min.js',
    'src/libs/jquery-ui/ui/i18n/datepicker-ru.js',
    // 'src/libs/bootstrap/dist/js/bootstrap.js',s
    'src/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
    'src/libs/font-awesome/svg-with-js/js/fontawesome-all.min.js',
    'src/libs/jssocials/dist/jssocials.js',
    'src/libs/country-select-js/build/js/countrySelect.js',
    // 'src/js/main.js' // Всегда в конце
  ])
    .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
    .pipe(uglify()) // Сжимаем JS файл
    .pipe(gulp.dest('src/js')); // Выгружаем в папку src/js
});

// gulp.task('img', function () {
//   return gulp.src('src/img/**/*') // Берем все изображения из src
//     .pipe(cache(imagemin({ // С кешированием
//       // .pipe(imagemin({ // Сжимаем изображения без кеширования
//       interlaced: true,
//       progressive: true,
//       svgoPlugins: [{removeViewBox: false}],
//       use: [pngquant()]
//     }))/**/)
//     .pipe(gulp.dest('dist/img')); // Выгружаем на продакшн
// });

gulp.task('img', function () {
  return gulp.src('src/img/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      // imagemin.svgo({
      //   plugins: [
      //     {removeViewBox: true},
      //     {cleanupIDs: false}
      //   ]
      // })
    ]))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'css-libs', 'styles', 'js-libs', 'js-main'], function () {
  gulp.watch('src/sass/**/*.scss', ['styles']); // Наблюдение за sass файлами в папке sass
  gulp.watch('src/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
  gulp.watch('src/js/*.js', ['js-main']);   // Наблюдение за JS файлами в папке js
  gulp.watch('src/**/*.php', browserSync.reload);   // Наблюдение за PHP файлами
  // gulp.watch('src/php/*.php', browserSync.reload);
});

// gulp.task('build', ['clean', 'clear', 'styles', 'css-libs', 'js-libs', 'js-main', 'img'], function () {

gulp.task('build', function(fn) {
  run('clean', 'clear', 'styles', 'css-libs', 'js-libs', 'js-main', 'img', fn);

  const buildCss = gulp.src([ // Переносим CSS в продакшн
    'src/css/*.css',
    '!src/css/libs.css'
  ])
    .pipe(gulp.dest('dist/css'))

  const buildHtml = gulp.src('src/*.html') // Переносим HTML в продакшн
    .pipe(gulp.dest('dist'))

  const buildFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в продакшн
    .pipe(gulp.dest('dist/fonts'))

  // const buildImg = gulp.src('src/img/**/*') // Переносим картинки в продакшн
  //   .pipe(gulp.dest('dist/img'))

  const buildJs = gulp.src('src/js/**/*') // Переносим js скрипты в продакшн
    .pipe(gulp.dest('dist/js'))

  const buildPhp = gulp.src('src/php/**/*') // Переносим php скрипты в продакшн
    .pipe(gulp.dest('dist/php'))

  const buildPhtml = gulp.src('src/*.php') // Переносим php страницы и скрипты в продакшн
    .pipe(gulp.dest('dist'))

});

gulp.task('clean', function () {
  return del.sync('dist'); // del dist dir before build project
});

gulp.task('clear', function (callback) {
  return cache.clearAll();
});

gulp.task('default', ['watch']);
