# express-starter

This is a blueprint I am using to begin projects such as web sites or apps.

It is using Express, Gulp, Pug, ESLint, Mocha, ES6+Babel etc.

# Getting started for development:

1. Open a terminal (e.g. Hyper (Ctrl+shift+c to copy, right click to paste)).

`git clone https://github.com/GCDeveloper/express-starter`

cd to express-starter

`npm install` - This downloads and installs the devDependencies.

```
"devDependencies": {
    "babel-core": "^6.26.0",
    "babel-preset-env": "^1.6.1",
    "dotenv": "^4.0.0",
    "gulp": "^3.9.1",
    "gulp-babel": "^7.0.0",
    "gulp-clean-css": "^3.9.2",
    "gulp-concat": "^2.6.1",
    "gulp-eslint": "^4.0.1",
    "gulp-htmlmin": "^4.0.0",
    "gulp-image": "^4.2.0",
    "gulp-pug": "^3.3.0",
    "gulp-uglify-es": "^1.0.0",
    "mocha": "^5.0.0",
    "pump": "^2.0.0"
  }
}
```

Note: guetzli image compression is disabled due to build issue. All other image compression is enabled. May need to disable zopflipng too.

`npm test` - This will now show latest state of tests in  ./test/*.js


2. Open a new terminal (or Hyper tab).

cd to express-starter

You may need to `npm install gulp-cli -g`

`gulp watch` - This will do `gulp build` and `gulp lint` when code inside ./src is changed+saved. This processes the code in ./src through minification, ES6->ES5 for client.js code, concats into bundle.js for http 1.1 etc.

There is also `gulp image` which takes all images from the folder ./uncompressed/ and compresses them into ./compressed/. Use `getCompressedImages` to move these images to ./src/public/images/

3. Open a new terminal tab/window.

(If dist folder has not been built do `gulp build` first)

`npm start` to start the server on the PORT specified in .env (default: 3000).
(or `nodemon ./dist/bin/www`. If you don't have nodemon then do `npm install nodemon` with option either `-g` (global) or `--D` (devDependency).)

# For production

`npm install --only=production` to not install devDependencies.

<<<<<<< HEAD
Only provide the dist folder.
=======
Only provide the dist folder.
>>>>>>> b21d6304a8d2ee97835d1625256a01c4d5f6f8de
