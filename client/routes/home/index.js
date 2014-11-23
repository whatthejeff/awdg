'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Home Routes
 */

// var mongoose = require('mongoose');
// var Event = mongoose.model('Event');

module.exports = function(app) {
    app.get('/', function(req, res, next) {
        // components
        // featured event
        // latest event
        res.render('home/index', {
            module: 'home'
        });
    });

}