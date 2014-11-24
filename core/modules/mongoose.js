'use strict';

/**
 * AWDG
 *
 * @copyright awdg.org 2014
 *
 */

/**
 * Mongoose DB Configuration
 */
var mongoose = require('mongoose');

// load models
require('../models/Event');
require('../models/Member');
require('../models/Attending');
require('../models/Venue');


module.exports = function(core) {

    /**
     * Connnect to Mongo and return the connection
     */
    return  mongoose.connect(core.database.uri);
};