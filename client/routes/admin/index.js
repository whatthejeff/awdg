'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Admin Dashboard Routes
 */

var mongoose = require('mongoose');
// var Event = mongoose.model('Event');
// var Roll = mongoose.model('Roll');
// var Member = mongoose.model('Member');

module.exports = function(app, passport) {

    app.get('/admin', function(req, res, next) {
        // components -
        // events
        // member-roll
        // sponsors
        res.render('admin/index', {
            module: 'admin'
        });
    });


}