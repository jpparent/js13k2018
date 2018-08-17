var gulp = require('gulp'),
	pump = require('pump'),
	cleanCSS = require('gulp-clean-css'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	zip = require('gulp-zip'),
	htmlmin = require('gulp-htmlmin'),
	size = require('gulp-size'),
	watch = require('gulp-watch'),
	rename = require('gulp-rename'),
	del = require('del'),
	inject = require('gulp-inject');

var paths = {
	src: {
		css: 'src/css/*.css',
		js: [
			'src/js/engine/game.js', // explicitly first in order to concat properly
			'src/js/**/*.js'
		],
		html: 'src/index.html'
	},
	build: {
		dir: '_build',
		js: 'game.min.js',
		css: 'game.min.css'
	},
	dist: {
		dir: '_dist',
	}
};

function buildCSS() {
	return pump([
		gulp.src(paths.src.css),
		concat(paths.build.css),
		cleanCSS(),
		gulp.dest(paths.build.dir)
	]);
}

function buildJS() {
	return gulp.src(paths.src.js)
		.pipe(concat(paths.build.js))
		.pipe(gulp.dest(paths.build.dir));
}

function distJS() {
	return pump([ 
		gulp.src(paths.src.js),
		uglify(),
		concat(paths.build.js),
		gulp.dest(paths.build.dir)
	]);
}

function buildHTML() {
	return pump([ 
		gulp.src(paths.src.html),
		// inject(gulp.src(['./_build/game.min.css', './_build/game.min.js']), {
		// 	transform: function( filePath, file){
		// 		return file.contents.toString('utf8');
		// 	},
		// 	removeTags: true
		// }),
		inject(gulp.src(['./_build/game.min.css', './_build/game.min.js']), {
			ignorePath: '/_build', 
			removeTags: true, 
			addRootSlash: false 
		}),
		htmlmin({collapseWhitespace: true}),
		rename('index.html'),
		gulp.dest(paths.build.dir)
	]);
}

function zipBuild() {
	return pump([ 
		gulp.src(paths.build.dir),
		zip('game.zip'),
		gulp.dest(paths.dist.dir),
		size()
	]);
}

function clean() {
	return del([paths.build.dir, paths.dist.dir]);
}

function watcher() {	
	gulp.watch(paths.src.js, gulp.series(buildJS, zipBuild));
	gulp.watch(paths.src.css, gulp.series(buildCSS, zipBuild));
	gulp.watch(paths.src.html, gulp.series(buildHTML, zipBuild));
}

var build = gulp.series(clean, gulp.parallel(buildJS, buildCSS), buildHTML, zipBuild, watcher);
var dist = gulp.series(clean, gulp.parallel(distJS, buildCSS), buildHTML, zipBuild, watcher);
exports.build = build;
exports.default = dist;