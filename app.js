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
var _ = require('lodash');
var root = path.normalize(__dirname);
var env = process.env.NODE_ENV || 'development';
var app = express();

// routes
// var events = require(root+'/api/events/routes');
var members = require(root+'/api/members/routes');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));



app.use(express.static(path.join(__dirname, 'public')));

// use the routes
// app.use('/', events );
app.use('/', members );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err.status);
        res.status(err.status || 500);
        res.send('error/' + err.status, {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error/500', {
        message: err.message,
        error: {}
    });
});


module.exports = app;