'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Location Routes
 */

var mongoose = require('mongoose');
var Venue = mongoose.model('Venue');
var async = require('async');
var form = require('express-form');
var field = form.field;

module.exports = function(app, passport) {

    app.get('/venues', function(req, res, next) {
        res.render('venues/index', {
            module: 'venue'
        });
    });

    app.get('/admin/venues', function(req, res, next) {

        Venue.find(function(err, venues) {
            if (err) return next(err);
            res.render('venues/admin-index', {
                module: 'admin-venue',
                venues:venues
            });
        });



    });

    app.get('/admin/venues/create', function(req, res, next) {
        res.render('venues/create', {
            module: 'venues'
        });
    });

    app.post('/admin/venues/create', form(
        field("name").trim().required().is(/^[\w]+$/),
        field("url").trim().isUrl(),
        field("phone").trim(),
        field("address").trim().required(),
        field("info")
    ), function(req, res, next) {
        var venue = new Venue(req.form);
        venue.save(function(err) {
            if (err) return handleError(err);
            res.redirect('/admin/venues');
        });
    });

}