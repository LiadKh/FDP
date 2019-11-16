var path = require('path');
if (process.env.NODE_ENV !== 'production') {
  const result = require('dotenv').config({
    path: path.resolve(process.cwd(), './config/environment', `${process.env.NODE_ENV}.env`)
  })

  if (result.error) {
    throw result.error
  }

  console.log(result.parsed)
}

var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('../database/mongodb/connection')

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
