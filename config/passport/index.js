'use strict';

/**
 * AWDG
 *
 * @copyright awdg.org 2014
 *
 */

var config = require('../../config');

/**
 * Passport Configuration
 */
module.exports = function(passport) {

    passport.serializeUser(function(member, done) {
        done(null, member._id);
    });

    passport.deserializeUser(function(id, done) {
        Member.findById(id, function(err, member) {
            done(err, member);
        });
    });

};