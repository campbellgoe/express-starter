# express-starter

This is a blueprint I am using to begin projects such as web sites or apps.

It is using Express, Gulp, Pug, ESLint, Mocha, ES6+Babel etc.

# Getting started for development:

1. Open a terminal (e.g. Hyper (Ctrl+shift+c to copy, right click to paste)).

`git clone https://github.com/GCDeveloper/express-starter`

cd to express-starter

`npm install` - This downloads and installs the dependencies.

Note: guetzli image compression is disabled due to a build issue. All other image compression is enabled. May need to disable zopflipng too. May want to use a progressive image compression so jpegs load nicely on slow connections.

`npm test` - This will now show latest state of tests in  ./test/\*.js

2. Open a new terminal (or Hyper tab).

cd to express-starter

You may need to `npm install gulp-cli -g`

`npm run build` will process src files into dist, including compressing images and minifying code.

`npm run dev` will similarly process src files, but without compressing or minifying.

`gulp reset` will delete the temp and dist folders.


3. Open a new terminal tab/window.

(If dist folder has not been built do `npm run build` or `npm run dev` first)

`npm start` to start the server on the PORT specified in .env (default: 3000).

# Tips

Use HyperCwd https://github.com/hharnisc/hypercwd to configure the initial directory to open the terminal in.
