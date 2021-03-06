/*eslint-disable no-console */
//for some reason the uglify-es plugin is ignoring "@preserve" in comments, throwing a lint error in /dist folder.
const express = require('express');
const path = require('path');
//const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
//const users = require('./routes/users');

const app = express();
const helmet = require('helmet');

require('dotenv').config();

//setting secure http headers with helmet
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
//app.use('/users', users);

// catch 404 or other errors
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (res.headersSent) {
    //console.log("headers already sent");
    return next(err)
  } else {
     res.status(err.status || 500).render(path.join(__dirname, 'views', 'error'), err);
  }
});
module.exports = app;
