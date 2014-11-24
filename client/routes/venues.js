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
            module: 'admin-venue',
            venues: Venue.find()
        });
    });

    /**
     * move to api
     */

    // app.post('/venues', form(
    //     field("name").trim().required().is(/^[\w]+$/),
    //     field("url").trim().isUrl(),
    //     field("phone").trim(),
    //     field("address").trim().required(),
    //     field("info")
    // ), function(req, res, next) {
    //     var venue = new Venue(req.form);
    //     venue.save(function(err) {
    //         if (err) return handleError(err);
    //         res.redirect('/venues');
    //     });
    // });

}