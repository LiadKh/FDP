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
var fs = require('fs');

// require('../database/mongodb/connection')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));

// log all requests to access.log
app.use(logger('common', {
  stream: fs.createWriteStream(path.resolve(process.cwd(), 'access.log'), {
    flags: 'a'
  })
}))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(process.cwd(), 'client/build')));
}

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
