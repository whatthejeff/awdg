'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Event Routes
 */

var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var Roll = mongoose.model('Roll');
var Member = mongoose.model('Member');

module.exports = function(app, passport) {

    app.get('/events', function(req, res, next) {
        // components -
        // events
        // member-roll
        // sponsors
        res.render('events/index');
    });

    app.get('/events/:year/:month/:slug', function(req, res, next) {
        res.render('events/detail');
    });


}