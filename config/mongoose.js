'use strict';

/**
 * AWDG
 *
 * @copyright awdg.org 2014
 *
 */

/**
 * Mongoose Config
 */
var mongoose = require('mongoose');
var config = require('../config');


// load models
require(config.root + '/lib/models/Member');
require(config.root + '/lib/models/Roster');

module.exports = function(mongoose) {
    mongoose.connect(config.database.uri);
};