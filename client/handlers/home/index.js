'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Home Routes
 */

var mongoose = require('mongoose');
var Event = mongoose.model('Event');

module.exports = function(app, passport) {
    app.get('/', function(req, res, next) {
        res.render('home/index', {
            module: 'home'
        });
    });

    // app.get('/events/:year/:month/:slug', function(req, res, next) {
    //     res.render('events/detail');
    // });


}