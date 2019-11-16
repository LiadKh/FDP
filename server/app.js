var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

if (process.env.NODE_ENV !== 'production') {
  const result = require('dotenv').config({
    path: path.resolve(process.cwd(), './config/environment', `${process.env.NODE_ENV}.env`)
  })

  if (result.error) {
    throw result.error
  }

  console.log(result.parsed)
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
