'use strict';

/**
 * AWDG
 *
 * @copyright awdg.org 2014
 *
 * Event Model
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var stampIt = require('mongoose-stamp');

var Event = new Schema({
    title: {
            type: String,
            required: true,
    },
    date:{
        start:{
            type: Date,
            required:true,
            default: Date.now
        },
        end:Date,
    },
    description: String,
    status:String,
    featured:Boolean,
    _location:Schema.Types.ObjectId
}, {
    collection: 'events'
});

Event.plugin(stampIt);
mongoose.model('Event', Event);