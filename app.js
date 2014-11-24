'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 */

var express = require('express');
var logger = require('morgan');
var app = express();

/**
 * Set the logger
 */
app.use(logger('dev'));

/**
 * Use Express Promises
 */
app.use(require('express-promise')());


/**
 * Client
 *
 * Mount the client app
 */
require('./client')(app);


module.exports = app;