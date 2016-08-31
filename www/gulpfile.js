'use strict';

var gulp = require('gulp'),
    _if = require('gulp-if'),
    cssmin = require('gulp-cssnano'),
    less = require('gulp-less'),
    prefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

// To set an environment variable in Windows:
//      SET NODE_ENV=development
// on OS X or Linux:
//      export NODE_ENV=development

var development = process.env.NODE_ENV === 'development';

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        css: 'tpl/css/',
        js: 'tpl/js/'
    },
    src: { //Пути откуда брать исходники
        js: 'tpl/js/main.js',
        less: 'tpl/less/styles.less'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        js: 'tpl/js/main.js',
        less: 'tpl/less/styles.less'
    }
};

// Собираем все библиотеки в нашем проекте
gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(uglify())
        .pipe(rename({
            basename: 'main',
            suffix: ".min",
            extname: ".js"
          }))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('less:build', function () {
    gulp.src(path.src.less)
        .pipe(less())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(rename({
            basename: 'styles',
            suffix: ".min",
            extname: ".css"
          }))
        .pipe(gulp.dest(path.build.css));
});


gulp.task('build', [
    'js:build',
    'less:build'
]);

gulp.task('watch', function(){
    watch([path.watch.less], function(event, cb) {
        gulp.start('less:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
});

gulp.task(
    'default',
    [
        'build',
        'watch'
    ]
);