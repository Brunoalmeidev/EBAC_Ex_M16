const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeImagens() {
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}

function compilaSass() {
    return gulp.src('./source/styles/main.scss') // Obtém o arquivo 'main.scss' do diretório de origem
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed' // Compila o SASS em CSS comprimido (minificado)
        }).on('error', sass.logError)) // Trata erros de compilação do SASS e os exibe no console
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles')); // Salva o arquivo CSS compilado no diretório de destino
}


exports.default = function() {
    gulp .watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass))
    gulp .watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.series(comprimeJavaScript))
    gulp .watch('./source/images/*', { ignoreInitial: false }, gulp.series(comprimeImagens))
}