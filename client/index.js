'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 *
 * Web Client
 *
 */

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var passport = require('passport');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var swig = require('swig');
var core = require('../core');
var _ = require('lodash');
var mongoStore = require('connect-mongo')({
    session: session
});

module.exports = function(app) {

    /**
     * Sessions
     */
    _.assign(core.config.session, {
        store: new mongoStore({
            mongoose_connection: core.db.connection,
            collection: 'sessions'
        })
    });
    app.use(session(core.config.session));
    app.use(passport.initialize());
    app.use(passport.session());

    /**
     * Client Routes
     */
    require('./routes/home')(app);
    require('./routes/events')(app);
    require('./routes/members')(app);
    require('./routes/venues')(app);
    //
    //

    /**
     * Express Settings
     */
    app.use(cookieParser());
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
        res.render('error/' + err.status, error);
    });


    /**
     * Setup rendering engine
     */
    app.set('views', core.config.root + '/client/templates/views');
    app.set('view engine', 'html');
    app.engine('html', swig.renderFile);

    swig.setDefaults({
        cache: false,
        loader: swig.loaders.fs(core.config.root + '/client/templates')
    });


    /**
     * Disable view caching in dev mode
     */
    if (core.config.env == 'development') {
        app.set('view cache', false);
    }


}