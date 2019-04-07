var { src, task, series, parallel, dest, watch } = require('gulp');
var sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    rename = require('gulp-rename'),
    del = require('del');



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
exports.default = exports.watch;





// sprites////// _____--?.
svgSprite = require('gulp-svg-sprite');

function createSprite(cb) {
    src('app/assets/images/icons/**/*.svg')
        .pipe(svgSprite({
            mode: {
                css: { // Activate the «css» mode
                    sprite: 'sprite.svg',
                    render: {
                        scss: {
                            template: './templates/sprites.scss'
                        }
                    }
                }
            }
        }))
        .pipe(dest('./app/temp/sprite'));
    cb()
}

function copySpriteCSS(cb) {
    src('./app/temp/sprite/css/*.scss')
        .pipe(rename('_sprite.scss'))
        .pipe(dest('./app/assets/styles/modules/'))
    cb()
}

function copySpriteGraphic(cb) {
    src('./app/temp/sprite/css/**/*.svg')
        .pipe(dest('./app/assets/images/sprites'))
    cb()
}

function cleanSprite() {
    return del.sync(['./app/temp/sprite', './app/assets/images/sprites']);
}

function endCleanSprite(cb) {
    return del.sync(['./app/temp/sprite']);
}
exports.cleanSprite = cleanSprite;
exports.endCleanSprite = endCleanSprite;
exports.sprites = series(createSprite, parallel(copySpriteGraphic, copySpriteCSS))
//end sprites!
