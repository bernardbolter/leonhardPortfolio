'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var rename = require('gulp-rename');
var concat = require('gulp-concat');
const minify = require('gulp-minify');
var cachebust = require('gulp-cache-bust');

var css = {
    SASSsrc : '/Users/besco/Local Sites/leonhard/app/public/wp-content/themes/leonhardPortfolio/src/index.scss',
    ALLcss : '/Users/besco/Local Sites/leonhard/app/public/wp-content/themes/leonhardPortfolio/src/*.scss',
    JSsrc : '/Users/besco/Local Sites/leonhard/app/public/wp-content/themes/leonhardPortfolio/src/*.js',
    watch : '/Users/besco/Local Sites/leonhard/app/public/wp-content/themes/leonhardPortfolio/src/**/*',
    SASSbuild : '/Users/besco/Local Sites/leonhard/app/public/wp-content/themes/leonhardPortfolio',
    JSbuild : '/Users/besco/Local Sites/leonhard/app/public/wp-content/themes/leonhardPortfolio/js'
}

gulp.task('css', function(cb) {
    return gulp.src(css.SASSsrc)
        .pipe(sass())
        .pipe(rename('custom3.css'))
        .pipe(cachebust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest(css.SASSbuild))
        cb()
})


gulp.task('js', function(done) {
    return gulp.src(css.JSsrc)
    // .pipe(babel({
    //     presets: ['@babel/env']
    // }))
    .pipe(concat('bundle.js'))
    // .pipe(minify())
    .pipe(gulp.dest(css.JSbuild))
})

gulp.task('watch', function() {
    gulp.watch(css.ALLcss, gulp.series(['css']));
    gulp.watch(css.JSsrc, gulp.series(['js']));
})