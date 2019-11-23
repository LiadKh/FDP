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

require('../database/mongodb/connection')

var allRouters = require('./routes/allRoutes')

var app = express();

app.use(logger('dev'));

// log all requests to access.log
app.use(logger('common', {
  stream: fs.createWriteStream(path.resolve(process.cwd(), 'access.log'), {
    flags: 'a'
  })
}))

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(allRouters);

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(process.cwd(), 'client/build')));
} else {
  const routeList = require("express-routes-catalogue");
  routeList.default.terminal(app);
}

module.exports = app;
