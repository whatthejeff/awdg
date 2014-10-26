'use strict';

/**
 * AWDG
 *
 * @copyright awdg.org 2014
 *
 * Roll
 * List collection keeps track of an events rsvpd members.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var stampIt = require('mongoose-stamp');

var Roll = new Schema({
    event: {
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        date: Date
    },
    members: {
        type: Array,
        default: []
    }
}, {
    collection: 'roll'
});

Roll.plugin(stampIt);
mongoose.model('Roll', Roll);