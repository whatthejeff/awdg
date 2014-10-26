'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Member Routes
 */

var mongoose = require('mongoose');
var Member = mongoose.model('Member');

module.exports = function(app, passport) {
    app.get('/members/account', function(req, res, next) {
        // components
        // profile
        // account
        res.render('members/index', {
            module: 'members'
        });
    });

}