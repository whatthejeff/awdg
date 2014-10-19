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
var bodyParser = require('body-parser');
var fs = require('fs');
var util = require('util');
var mongoose = require('mongoose');

var config = require('./config/env');
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));



/**
 * Database
 * Load the mongoose instance
 */
require(config.root + '/config/mongoose')(mongoose);

/**
 * Routes
 */
// var events = require(root+'/api/events/routes');
// app.use('/api', events );
var members = require(config.root + '/api/members/routes');
app.use('/', members);


/**
 * 404 Errors
 * Catch Not found errors and forward them to the error handler
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
    res.send({
        message: err.message,
        error:(config.env == 'development')?err :{}
    });
});


module.exports = app;