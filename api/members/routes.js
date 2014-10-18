'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Member Routes
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Member = mongoose.model('Member');
var Roster = mongoose.model('Roster');
var _ = require('lodash');

/**
 * Fetch all members
 */
router.get('/api/members', function(req, res, next) {

    Member.find().exec(fetchMembers);

    function fetchMembers(err, members) {
        res.send({
            members: members
        });
    }

})

/**
 * Create a Member
 */
router.post('/api/members', function(req, res, next) {

    var payload = req.body;

    Member.findOne({
        email: payload.email
    }).exec(fetchMemberByEmail);

    function fetchMemberByEmail(err, member) {
        if (err) return console.log(err);
        if (!_.isNull(member)) {
            res.status(409).send({
                error: 'Member already exists'
            });
        }
    }

    var member = new Member(payload);
    var roster = new Roster({
        member: {
            _id: member._id,
            email: member.email
        }
    });

    roster.save(function(err, roster) {
        if (err) return console.log(err);
    });


    member.save(function(err, member) {
        if (err) return console.log(err);
        res.send(member);
    });



});


/**
 * Find a Member by Id
 */
router.get('/api/members/:id', function(req, res, next) {
    var member_id = req.params.id;
    Member.findOne({
        _id: member_id
    }, function(err, member) {
        if (err) return console.log(err);
        if (_.isNull(member)) {
            res.status(404).send();
        }
        res.send(member);
    });

})

/**
 * Update a Member
 */
router.put('/api/members/:id', function(req, res, next) {

})

/**
 * Delete a Member
 */
router.delete('/api/members/:id', function(req, res, next) {

});

module.exports = router;