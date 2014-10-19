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

// load mongoose
require(config.root + '/config/mongoose')(mongoose);

// routes
var members = require(config.root + '/api/members/routes');


// var events = require(root+'/api/events/routes');
// app.use('/api', events );

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));



// app.use(express.static(path.join(__dirname, 'public')));
app.use('/', members);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/**
 * error handler
 * stacktrace printed on development
 */
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error:(config.env == 'development')?err :{}
    });
});


module.exports = app;