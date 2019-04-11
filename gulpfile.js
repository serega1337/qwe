var { src, task, series, parallel, dest, watch } = require('gulp');
var sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    rename = require('gulp-rename'),
    del = require('del');
webpack = require('webpack');

let sloop = () => {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
}

function scss(cb) {
    src('./app/assets/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./app/temp/styles/'))
    cb()
}

function watch_files() {
    watch('./app/assets/styles/**/*.scss', series(scss, css_stream));
    watch('./app/index.html', reloadPage);
    watch('./app/assets/scripts/**/*.js', series(scripts, sloop, reloadPage));
}

function reloadPage(cb) {
    browserSync.reload();
    cb()
}

function scripts(cb) {
     webpack(require('./webpack.config.js'), function(err, stats) {
        if (err) {
            console.log(err.toString());
        }
        console.log(stats.toString());
    });
    cb()

};

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
exports.scripts = scripts;
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
    return del(['./app/temp/sprite', './app/assets/images/sprites']);
}

function endCleanSprite() {
    return del(['./app/temp/sprite']);
}
exports.cleanSprite = cleanSprite;
exports.endCleanSprite = endCleanSprite;
exports.sprites = series(cleanSprite, sloop, createSprite, sloop, parallel(copySpriteGraphic, copySpriteCSS), sloop, endCleanSprite)
//end sprites!