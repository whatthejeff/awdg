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
// var Member = mongoose.model('Member');
var async = require('async');
var uuid = require('node-uuid');

module.exports = function(app) {
    app.get('/api/members', function(req, res, next) {
        res.send('boom');
    });

    /**
     * Update Member
     */
    app.post('/api/members', function(req, res, next) {

        var payload = req.body;

        // check if the member exists
        Member.findOne({
            email: payload.email
        }, function(err, member) {
            if (err) return console.log(err);
            if (!_.isNull(member)) {
                res.status(409).send({
                    error: 'Member already exists'
                });
            }
        });

        var member = new Member(payload);
        res.send(member.save());

    });

}