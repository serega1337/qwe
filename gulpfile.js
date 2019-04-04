var { src, task, series, parallel, dest, watch } = require('gulp');
var sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();


function scss(cb) {
    src('./app/assets/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./app/temp/styles/'))
    cb()
}

function watch_files() {
    watch('./app/assets/styles/**/*.scss', series(scss, css_stream))
    watch('./app/index.html', reloadHTML)
}

function reloadHTML(cb) {
    browserSync.reload();
    cb()
}

function browser_sync() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
}

function css_stream(cb) {
    src('./app/temp/styles/styles.css').pipe(browserSync.stream())
    cb()
}

exports.scss = scss;
exports.watch = parallel(watch_files, browser_sync);
exports.default = exports.watch