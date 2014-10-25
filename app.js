'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 */

var express = require('express');
var path = require('path');
var logger = require('morgan');
var fs = require('fs');
var util = require('util');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config');
var app = express();


/**
 * Database
 * Load the mongoose instance
 */
require(config.root + '/config/mongoose')(mongoose);

/**
 * Client
 * Mount the client app
 */
require(config.root + '/client')(app);


/**
 * Set the logger
 */
app.use(logger('dev'));


/**
 * 404 Errors
 * Catch 404 errors and forward them to the error handler
 */
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/**
 * Error Handler
 * This will print the stacktrace on development only
 */
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    var error = (config.env == 'development') ? err : {};
    res.render('error/' + err.status, error);
});


module.exports = app;