"use strict";

var express = require('express');

var app = express();

var morgan = require('morgan');

var moment = require('moment'); // middlewares


var tokenChecker = require('../../interface_adapters/middleware/tokenChecker'); // routers


var userRoutes = require('../../interface_adapters/controller/userController');

var authRoutes = require('../../interface_adapters/controller/authController');

var friendRoutes = require('../../interface_adapters/controller/friendController');

var requestRoutes = require('../../interface_adapters/controller/requestController'); // Body Parser


app.use(express.urlencoded({
  limit: '50mb',
  extended: false
}));
app.use(express.json()); // Logger

app.use(morgan(function (tokens, req, res) {
  return ['Current Time------', moment(), "\n", 'User Agent--------', tokens['user-agent'](req, res), "\n", 'request Method----', tokens.method(req, res), "\n", 'Request URL-------', tokens.url(req, res), "\n", 'Response Status---', tokens.status(req, res), "\n", 'Response Time-----', tokens['response-time'](req, res), 'ms'].join(' ');
}));
app.use(function (req, res, next) {
  console.log('Request Body------', req.body);
  next();
}); // handle cors Errors

app.use(function (req, res, next) {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,x-access-token");
    return res.json({});
  }

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
  next();
}); //expose static files

app.use(express["static"]('static')); // routes to be published here

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/friend', friendRoutes);
app.use('/request', requestRoutes); // Error Handling

app.use(function (req, res, next) {
  var error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use(function (error, req, res, next) {
  res.status(error.status || 200);
  res.json({
    error: {
      message: error.message
    }
  });
});
module.exports = app;