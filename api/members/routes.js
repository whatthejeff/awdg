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

var getMembers = require('./getMembers');
var getMemberById = require('./getMemberById');
var createMember = require('./createMember');
// var updateMember = require('./updateMember');
// var deleteMember = require('./deleteMember');


/**
 * Get Members
 */
router.get('/api/members', getMembers);

/**
 * Get a Member by Id
 */
router.get('/api/members/:id', getMemberById);


/**
 * Create Member
 */
router.post('/api/members', createMember);


/**
 * Update a Member
 */
// router.put('/api/members/:id', updateMember)

/**
 * Delete a Member
 */
// router.delete('/api/members/:id', deleteMember);

module.exports = router;