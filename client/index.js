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
var fs = require('fs');
var path = require('path');
var passport = require('passport');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var swig = require('swig');
var _ = require('lodash');
var config = awdg('core/lib/config');
var core = awdg('core');
var mongoStore = require('connect-mongo')({
    session: session
});

module.exports = function(app) {

    /**
     * Sessions
     */
    _.assign(config.session, {
        store: new mongoStore({
            mongoose_connection: core.database.connection,
            collection: 'sessions'
        })
    });
    app.use(session(config.session));

    /**
     * Passport
     */
    awdg('client/routes/middleware/passport')(passport);
    app.use(passport.initialize());
    app.use(passport.session());

    /**
     * Load Routes
     */
    var home = awdg('client/routes/home');
    var events = awdg('client/routes/events');
    var members = awdg('client/routes/members');
    var venues = awdg('client/routes/venues');



    /**
     * Express Settings
     */
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(flash());


    app.use(express.static(path.join(config.root, '/public')));

    /**
     * Use the routes
     */
    app.use('/', home);
    app.use('/', events);
    app.use('/', members);
    app.use('/', venues);

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


    /**
     * Setup rendering engine
     */
    app.set('views', path.join(config.root, '/client/templates/views'));
    app.set('view engine', 'html');
    app.engine('html', swig.renderFile);

    swig.setDefaults({
        cache: false,
        loader: swig.loaders.fs(path.join(config.root, '/client/templates'))
    });


    /**
     * Disable view caching in dev mode
     */
    if (config.env == 'development') {
        app.set('view cache', false);
    }


}