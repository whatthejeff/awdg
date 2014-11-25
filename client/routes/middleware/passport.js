'use strict';

/**
 * AWDG
 *
 * @copyright awdg.org 2014
 *
 * Passport
 *
 */

var mongoose = require('mongoose');
var Member = mongoose.model('Member');
var LocalStrategy = require('passport-local').Strategy;
var form = require('express-form');
var field = form.field;


module.exports = function(passport) {

    passport.serializeUser(function(member, done) {
        done(null, member.id);
    });

    passport.deserializeUser(function(id, done) {

        Member.findById(id, function(err, member) {
            done(err, member);
        });

    });

    // login
    passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passReqToCallback: true
        },
        function(req, email, password, done) {

            Member.findOne({
                    'email': email
                },
                function(err, member) {
                    if (err) return done(err);
                    if (!member) {
                        return done(null, false, req.flash('error', 'User not found'));
                    }

                    member.authenticate(password, function(err, isMatch) {
                        if (isMatch) {
                            var time = 14 * 24 * 3600000;
                            req.session.cookie.maxAge = time; //2 weeks
                            req.session.cookie.expires = new Date(Date.now() + time);
                            req.session.touch();
                            return done(null, user, req.flash('success', 'Successfully logged in.'));
                        } else {
                            return done(null, false, req.flash('error', 'Invalid Password'));
                        }
                    });
                }
            );
        }));

    // join
    passport.use('join', new LocalStrategy({
            usernameField: 'email',
            passReqToCallback: true
        },
        function(req, email, password, done) {

            console.log(email);

            var findOrCreateMember = function() {

                Member.findOne({
                    email: req.body.email
                }, function(err, existingMember) {
                    if (existingMember) {
                        req.flash('form', {
                            email: req.body.email
                        });
                        return done(null, false, req.flash('error', 'A member account with that email address already exists.'));
                    }
                    // edit this portion to accept other properties when creating a user.
                    var member = new Member({
                        email: req.body.email,
                        password: req.body.password // member schema pre save task hashes this password
                    });

                    member.save(function(err) {
                        if (err) return done(err, false, req.flash('error', 'Error saving member.'));
                        var time = 14 * 24 * 3600000;
                        req.session.cookie.maxAge = time; //2 weeks
                        req.session.cookie.expires = new Date(Date.now() + time);
                        req.session.touch();
                        return done(null, member, req.flash('success', 'Thanks for signing up!!'));
                    });
                });
            };

            process.nextTick(findOrCreateMember);

        }));
};