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
var auth = require('../authorization');
var passport = require('passport');
var async = require('async');

module.exports = function(app, passport) {
    app.get('/members/account', auth.requiresLogin, function(req, res, next) {
        // components
        // profile
        // account
        res.render('members/account');
    });

    app.get('/members/login', function(req, res, next) {
        res.render('members/login');
    });


    app.get('/members/join', function(req, res, next) {
        res.render('members/join');
    });
    app.post('/members/join', function(req, res, next) {
        // validate input

        // calls next middleware to authenticate with passport
        passport.authenticate('signup', {
            successRedirect: '/members/account',
            failureRedirect: 'members/join',
            failureFlash: true
        })(req, res, next);

    });
}