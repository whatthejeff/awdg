'use strict';

/**
 * AWDG
 *
 * @copyright awdg.org 2014
 *
 */

var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var Member = mongoose.model('Member');
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

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(email, password, done) {

        Member.findOne({
            email: email
        }, function(err, member) {
            if (err) {
                return done(err);
            }
            if (!member) {
                return done(null, false, {
                    message: 'member with that email doent exist'
                });
            }
            member.authenticate(password, function(err, isMatch) {
                if (err)  return done(err);
                if (isMatch) {
                    return done(null, member);
                } else {
                    return done(null, false, {
                        message: 'Invalid password'
                    });
                }
            });
        });


    }));

};