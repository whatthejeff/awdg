'use strict'
/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Create a new member
 */
var mongoose = require('mongoose');
var Member = mongoose.model('Member');
var _ = require('lodash');


function createMember(req, res, next) {

    var payload = req.body;


    Member.findOne({
        email: payload.email
    }).exec(fetchMemberByEmail);

    function fetchMemberByEmail(err, member) {
        if (err) return next(err);
        if (!_.isNull(member)) {
            var err = new Error('Member already exists');
            err.status = 409;
            next(err);
        }
    }

    var member = new Member(payload);
    member.save(function(err, member) {
        if (err) return next(err);
        handleResponse(member);
    });

    function handleResponse(member) {
        res.status(201).send(member);
    }

}


module.exports = createMember;