'use strict';

/**
 * AWDG
 *
 * @copyright awdg.org 2014
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

/**
 * Member
 */
var Member = new Schema({
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        avatar: {
            type: String,
            default: ''
        },
        postalCode: {
            home: String,
            work: String
        },
        social: {
            type: Schema.Types.Mixed,
            default: {}
        },
        bio: {
            type: String,
            default: ''
        },
        forHire: {
            type: Boolean,
            default: false
        },
        tags:Array
    }
}, {
    collection: 'members'
});



/**
 * Presave Middleware
 *
 */
Member.pre('save', function(next) {
    var member = this;
    if (!member.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(member.password, salt, function(err, hash) {
            if (err) return next(err);
            member.password = hash;
            next();
        });
    });


});

/**
 * Methods
 */
Member.methods = {
    /**
     * Authenticate
     *
     * Compare paswords
     * @param  {String}  password
     * @param  {Function} cb
     * @return {Boolean}
     */
    authenticate: function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    }
};

/**
 * Return a json object without passwords and such
 */
Member.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.password;
        return ret;
    }
});

mongoose.model('Member', Member);