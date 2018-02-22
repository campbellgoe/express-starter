/* eslint-disable no-console */
const gulp = require('gulp');
const pump = require('pump');
const uglify = require('gulp-uglify-es').default;
const pug = require('gulp-pug');
const htmlmin = require('gulp-htmlmin');
const image = require('gulp-image');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const debug = require('gulp-debug');
const rimraf = require('rimraf');
const fs = require('fs');
const gulpif = require('gulp-if');

const argv = process.argv;

const doMinify = (argv.indexOf('--minify') >= 3);//whether to minify js, css, html
const doImages = (argv.indexOf('--images') >= 3);//whether to compress images
const doVerbose = (argv.indexOf('--verbose') >= 3);//whether to log gulp files in processing

if(doMinify){
  console.log("minify of html, css, js is enabled");
}
if(doImages){
  console.log("compression of images is enabled");
}
if(doVerbose){
  console.log("verbose messaging is enabled");
}

//default (no task provided) will output a message to the console
gulp.task('default', (done) => {
  console.log('\r\nPlease specify a gulp task (see gulpfile.js).');
  done();
  return;
});

//reset deletes temp and dist folders

gulp.task('reset', () => {
  deleteTemp(() => {
    deleteDist((done = Function.prototype) => {
      done();
      return;
    });
  });
});

//deleteTemp does that
gulp.task('deleteTemp', () => {
  deleteTemp((done = Function.prototype) =>{
      done();
      return;
    });
});

//delete temporary folder
function deleteTemp(done = Function.prototype){
  rimraf('temp', fs, function(){
    done();
    return; 
  });
}
//delete dist folder
function deleteDist(done = Function.prototype){
  rimraf('dist', fs, function(){
    done();
    return; 
  });
}

//lint runs a linter on the js

gulp.task('lint', lint);//linter

function lint(done){
  pump([
    gulp.src(['**/*.js','!node_modules/**', '!dist/**', '!temp/**']),
    eslint(),
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    eslint.format(),
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    eslint.failAfterError()
    ],
    done()
    );
}

//build processes the s(ou)rc(e) code for dist(ribution)
//--images compresses the images
//--minify minifies the html, css, and js.
//--verbose outputs debug messages for all files in the pipeline

gulp.task('build', (done) => {
  //move code which is unprocessed to correct dist location
  //process private (minify toplevel and routes js, compile pug views)
  //process public (transpile and minify public js, compress images, minify css)
  moveUnchangedFiles(function(){
    processPrivateJS(function(){
      processViews(function(){
        processPublicJS(function(){
          processCSS(function(){
            processImages(function(){
              done();
              return;
            });
          });
        });
      });
    });
  });
});

//move files which will not be processed
function moveUnchangedFiles(done = Function.prototype){
  pump([
    gulp.src('src/bin/*'),
    gulpif(doVerbose,
      debug({title: 'moving ./bin/*:'})
    ),
    gulp.dest('dist/bin')
  ], function cb(er){
    if(er){
      console.error(er);
    }
    done();
    return; 
  });
}

//minifies app.js, and other top level .js, then minifies js in routes
function processPrivateJS(done = Function.prototype){
  pump([
    gulp.src('src/*.js'),//minify js from top src
    gulpif(doVerbose,
      debug({title: 'processing private js:'})
    ),
    gulpif(doMinify,
      uglify({toplevel:true, ecma:6})
    ),
    gulp.dest('dist')
  ], function cb(er){
     if(er){
      console.error(er);
    }
    pump([
      gulp.src('src/routes/*.js'),//minify js in routes
      gulpif(doMinify,
        uglify({toplevel:true, ecma:6})
      ),
      gulp.dest('dist/routes')
    ], function cb(er){
      if(er){
        console.error(er);
      }
      done();
      return; 
    });
  });
}

function processViews(done = Function.prototype){
  pump([
    gulp.src('src/views/*.pug'),//convert pug to html and minify html, css, js in the html file.
    gulpif(doVerbose,
      debug({title: 'processing pug views:'})
    ),
    pug(),
    gulpif(doMinify,
      htmlmin({minifyCSS:true,minifyJS:true,removeComments:true})
    ),
    gulp.dest('dist/views')
  ], function cb(er){
    if(er){
      console.error(er);
    }
    done();
    return; 
  });
}

//transpiles ES6+ in public, to browser friendly ES5.
function processPublicJS(done = Function.prototype){
  //let jsFiles = ['src/public/js/ease.js', 'src/public/js/client.js'];
  pump([
    
    gulp.src('src/public/**/*.js'),//minify, transpile, and concat js from public src
      gulpif(doVerbose,
        debug({title: 'processing public js:'})
      ),
      //concat('bundle.js'),//let browserify do this bit
      babel({
        presets: ['env']
      }).on('error', function(err){
        throw err;
      }),
      gulpif(doMinify,
        uglify({toplevel:true, ecma:5})
      ),
      gulp.dest('temp')
    ], function cb(er){
      if(er){
        console.error(er);
      }
      done();
      return; 
    });
}

function processCSS(done = Function.prototype){
  pump([
    gulp.src('src/public/css/*'),//minify css from public src
    gulpif(doVerbose,
      debug({title: 'processing public CSS:'})
    ),
    gulpif(doMinify,
      cleanCSS()
    ),
    gulp.dest('dist/public/css')
  ], function cb(er){
    if(er){
      console.error(er);
    }
    done();
    return; 
  });
}

function processImages(done = Function.prototype){
  pump([
    gulp.src('src/public/images/*'),//compress images
    gulpif(doVerbose,
      debug({title: 'processing images:'})
    ),
    gulpif(doImages,
      image({
        guetzli:false
      })
    ),
    gulp.dest('dist/public/images')
    ], function cb(er){
    if(er){
      console.error(er);
    }
    done();
    return; 
  });
}

