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
var auth = require('./middleware/auth');
var passport = require('passport');
var async = require('async');
var uuid = require('node-uuid');
var form = require('express-form');
var field = form.field;

module.exports = function(app, passport) {
    app.get('/account', auth.requiresLogin, function(req, res, next) {
        // components
        // profile
        // account
        res.render('members/account');
    });

    app.get('/login', function(req, res, next) {
        res.render('members/login');
    });


    app.get('/join', function(req, res, next) {
        res.render('members/join');
    });

    app.post('/members/join', form(
        // field("name-first").trim().required().is(/^[\w]+$/),
        // field("name-last").trim().required().is(/^[\w]+$/),
        // field("zip-home").trim().required().is(/^[\d]+$/),
        // field("zip-work").trim().required().is(/^[\d]+$/),
        field("email").trim().isEmail(),
        field("password").trim().required()
    ), function createMemberHandler(req, res, next) {
        if (!req.form.isValid) {
            console.log(req.form.errors);
            res.render('members/join', {
                errors: req.form.errors
            });
        }
        console.log(req.form);

        var params = {
            name: {
                first: req.form['name-first'],
                last: req.form['name-last']
            },
            email: req.form.email,
            password: req.form.password
        }

        // console.log(params);

        // var member = new Member(params);
        // member.profile.zip = {
        //     home:req.form['zip-home'],
        //     work:req.form['zip-work']
        // }
        // console.log(member);



        // var params = req.body;


        // check if member exists
        // console.log(params);
        // req.send('joining');
        // var member  = new Member(params);
        // console.log(member);

        // calls next middleware to authenticate with passport
        // passport.authenticate('join', {
        //     successRedirect: '/members/account',
        //     failureRedirect: 'members/join',
        //     failureFlash: true
        // })(req, res, next);

    });
}