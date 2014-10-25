'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 */

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var passport = require('passport');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var config = require('../config');


module.exports = function(app) {

    /**
     * Setup Passport
     */
    require(config.root + '/config/passport')(passport);


    /**
     * Express Settings
     */
    app.use(cookieParser());
    app.use(express.static(config.root + '/public'));


    /**
     * Setup rendering engine
     */
    app.set('views', config.root + '/client/theme/templates/views');
    app.set('view engine', 'html');

    app.engine('html', swig.renderFile);
    swig.setDefaults({
        cache: false,
        loader: swig.loaders.fs(config.root + '/client/theme/templates')
    });


    /**
     * Disable view caching in dev mode
     */
    if (config.env == 'development') {
        app.set('view cache', false);
    }


    /**
     * Client Routes
     */
     app.use('/', require('./routes/home'));
}