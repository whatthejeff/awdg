'use strict';

/**
 * AWDG
 *
 * @copyright awdg.org 2014
 *
 * Location
 *
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var stampIt = require('mongoose-stamp');

var Location = new Schema({
    name:String,
    address: {
        street: {
            type: String,
            default: ''
        },
        suite: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        state: {
            type: String,
            default: ''
        },
        postalCode: {
            type: String,
            default: ''
        },
    },
    coords: {
        longitude: Number,
        latitude: Number
    },
}, {
    collection: 'location'
});

Location.plugin(stampIt);
mongoose.model('Location', Location);