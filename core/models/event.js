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
    name: {
            type: String,
            required: true,
    },
    slug:String,
    date:{
        start:{
            type: Date,
            required:true,
            default: Date.now
        },
        end:Date,
    },
    publishDate:Date,
    description: String,
    featured:Boolean,
    _venue:Schema.Types.ObjectId,
    sponsors:Schema.Types.Mixed
}, {
    collection: 'events'
});

Event.plugin(stampIt);
mongoose.model('Event', Event);