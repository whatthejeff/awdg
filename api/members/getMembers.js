'use strict'
/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Get All Members
 */
var mongoose = require('mongoose');
var Member = mongoose.model('Member');
var _ = require('lodash');


function getMembers(req, res, next) {
    Member.find().exec(handleResponse);

    function handleResponse(err, members) {
        if (err) return next(err);
        res.send({
            members: members
        });
    }
}


module.exports = getMembers;