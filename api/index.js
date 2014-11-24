'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 *
 * API Client
 *
 */

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var core = require('../core');
var _ = require('lodash');

module.exports = function(app) {

    /**
     * Api Routes
     */
    // require('./routes/home')(app);
    // require('./routes/events')(app);
    // require('./routes/members')(app);
    // require('./routes/venues')(app);
    //
    //

    /**
     * Express Settings
     */

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));


    app.use(express.static(core.config.root + '/public'));

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
        var error = (core.config.env == 'development') ? err : {};
        res.send({
            message: err.message,
            error: {}
        });
    });

}