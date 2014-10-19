'use strict'
/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Get Member By Id
 */
var mongoose = require('mongoose');
var Member = mongoose.model('Member');
var _ = require('lodash');


function getMemberById(req, res, next) {
    var member_id = req.params.id;

    Member.findOne({
        _id: member_id
    }, handleResponse);

    function handleResponse(err, member) {
        if (err) return next(err);
        if (!_.isNull(member)) {
            res.send(member);
        }
        next();
    }
}


module.exports = getMemberById;