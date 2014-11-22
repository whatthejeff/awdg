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
            module: 'venues'
        });
    });
    app.get('/admin/venues', function(req, res, next) {
        res.render('venues/index', {
            module: 'venues'
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
        field("street-address").trim().required().isAlphanumeric(),
        field("extended-address"),
        field("locality").trim().required().isAlphanumeric(),
        field("region").trim().required().isAlphanumeric(),
        field("postal-code").trim().required().isAlphanumeric(),
        field("info")
    ), function(req, res, next) {
        console.log(req.form);
        // res.render('venues/create', {
        //     module: 'locations'
        // });
    });


}