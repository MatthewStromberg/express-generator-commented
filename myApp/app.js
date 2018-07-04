/*
Create a custom Error which comes with more
functionality than a default error
*/
var createError = require('http-errors');
/**
 * Module that allows for easier use of NodeJS
 * without needing to define as many functions.
 */
var express = require('express');
/**
 * Used to generate path for files
 */
var path = require('path');
/**
 * This takes all the cookies the client sends and
 * puts them in request.cookies. It also allows you
 * to modify them before sending them back to the
 * client, by changing response.cookies
 */
var cookieParser = require('cookie-parser');
/**
 * When you run your app, you might notice that
 * all the routes that are requested are logged
 * to console. If you want to disable this,
 * you can just comment out this middleware.
 */
var logger = require('morgan');

/**
 * Handle requests for the /index page
 */
var indexRouter = require('./routes/index');

/**
 * Handle requests for the /users page
 */
var usersRouter = require('./routes/users');

var app = express();

// view engine setup, where the views are located
app.set('views', path.join(__dirname, 'views'));
// Establish our view engine, in this case EJS
app.set('view engine', 'ejs');

//Comment this out if you don't want console logs
app.use(logger('dev'));
/**
 * Handle POST requests of data in JSON format
 * using request.body
 * In place of Body Parser
 */
app.use(express.json());
/**
 * Handle GET requests in the URL, using
 * request.query
 * @type {[type]}
 */
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
/**
 * This middleware serves static assets from your
 * public folder. If you wanted to rename or move
 * the public folder, you can change the path here.
 */
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// Part of the http-errors Module
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;