/* eslint no-console: "off" */

const gulp = require('gulp');
const pump = require('pump');
const uglify = require('gulp-uglify-es').default;
const pug = require('gulp-pug');
const htmlmin = require('gulp-htmlmin');
const image = require('gulp-image');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

//gulp build
gulp.task('build', build);//builds src into dist
//gulp image
gulp.task('image', compressImages);//compresses images in the images/uncompressed folder
//gulp getCompressedImages
gulp.task('getCompressedImages', getCompressedImages);//moves compressed images to src
//gulp watch
gulp.task('watch', watch);//builds src into dist on edit of src, and runs linter.
//gulp lint
gulp.task('lint', lint);//linter

//move from src to dist and process the files such as compressing, and converting pug to html.
function build(done) {
  var t0 = Date.now();
  console.log('Building at ', new Date().toLocaleTimeString().replace('/.*(d{2}:d{2}:d{2}).*/', '$1'));
  pump([
        gulp.src('src/bin/*'),//move bin/www
        gulp.dest('dist/bin'),
        gulp.src('src/*.js'),//minify js from top src
        uglify({toplevel:true, ecma:6}),
        gulp.dest('dist'),
        gulp.src('src/routes/*.js'),//minify js in routes
        uglify({toplevel:true, ecma:6}),
        gulp.dest('dist/routes'),
        gulp.src('src/views/*.pug'),//convert pug to html and minify html, css, js in the html file.
        pug(),
        htmlmin({minifyCSS:true,minifyJS:true,removeComments:true}),
        gulp.dest('dist/views'),
        gulp.src('src/public/images/*'),//move images from src to dest
        gulp.dest('dist/public/images'),
        gulp.src('src/public/js/*.js'),//minify, transpile, and concat js from public src
        concat('bundle.js'),
        babel({
          presets: ['env']
        }),
        uglify({toplevel:true, ecma:5}),
        gulp.dest('dist/public/js'),
        gulp.src('src/public/css/*'),//minify css from public src
        cleanCSS(),
        gulp.dest('dist/public/css')
        ],
        function cb(er){
          var t1 = Date.now();
          console.log('...Built in ', (t1-t0)/1000, 'seconds.', er || '');
        typeof done == 'function' ? done() : null;//fire done if it is a function
        return; 
      }
      );
}
//run gulp build when a file in src changes
function watch(){
  gulp.watch('src/**/*',
    function(){
      build();
      lint();
    }
  );
  console.log('Watching src');
}
//after compressing, it's recommended to place it in public/images
function compressImages(done){
  pump([
        gulp.src('images/uncompressed/*'),//compress images
        image({
          guetzli:false
        }),
        gulp.dest('images/compressed')
        ],
        done
        );
}

function getCompressedImages(done){
  pump([
    gulp.src('images/compressed/*'),
    gulp.dest('src/public/images')
    ],
    done
    );
}

function lint(done){
  pump([
    gulp.src(['**/*.js','!node_modules/**']),
    eslint(),
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        eslint.format(),
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        eslint.failAfterError()
        ],
        done
        );
}

//gulp
gulp.task('default', defaultTask);

function defaultTask(done) {
  console.log('\r\nUse gulp command. Where command is one of the following:','\r\nbuild: moves/processes files from src to dist.','\r\nimage: moves/compresses images from images/uncompressed to images/compressed.','\r\ngetCompressedImages: moves all from images/compressed to src/public/images.\r\n','watch: does gulp build when a file in src changes.\r\n','lint: look for possible improvements, and standardization opportunities.\r\n');
  done();
}