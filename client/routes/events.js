'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Event Routes
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var Member = mongoose.model('Member');
var Attending = mongoose.model('Attending');


router.get('/events', function(req, res, next) {
    res.render('events/index', {
        module: 'events'
    });
});

router.get('/events/:year/:month/:slug', function(req, res, next) {
    res.render('events/detail');
});

module.exports = router;