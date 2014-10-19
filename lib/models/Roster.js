'use strict';

/**
 * AWDG
 *
 * @copyright awdg.org 2014
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Roster
 * List collection holds a members history of attended events.
 */
var Roster = new Schema({
    member: {
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        }
    },
    events: {
        type: Array,
        default: []
    }
}, {
    collection: 'roster'
});
mongoose.model('Roster', Roster);