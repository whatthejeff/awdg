'use strict';

/**
 * AWDG
 *
 * @copyright awdg.org 2014
 *
 * Venue
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var stampIt = require('mongoose-stamp');

var Venue = new Schema({
    name: String,
    url: String,
    address: {
        street: {
            type: String,
            default: ''
        },
        extended: {
            type: String,
            default: ''
        },
        locality: {
            type: String,
            default: ''
        },
        region: {
            type: String,
            default: ''
        },
        postalCode: {
            type: String,
            default: ''
        },
        countryName: {
            type: String,
            default: ''
        },
    },
    info: String,
    social: {
        facebook: String,
        twitter: String,
        foursquare: String
    },
    coords: {
        longitude: Number,
        latitude: Number
    },
}, {
    collection: 'location'
});

Venue.plugin(stampIt);
mongoose.model('Venue', Venue);