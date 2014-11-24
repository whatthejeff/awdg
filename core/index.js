'use strict';

/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Core
 * Mount global modules here
 *
 *
 */

var path = require('path');
var fs = require('fs');
var dotenv = require('dotenv');

/**
 * Load environment variables
 */
dotenv.load();

/**
 * This is where we setup the app environment and default options
 * - ssl/ port numbers etc
 * - database and service credentials
 */


var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

var config = {
    name: pkg.name,
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 2934,
    root: path.normalize(__dirname + '../..'),
    session: {
        name: '_awdg',
        secret: 'i<3th3W3b',
        resave:false,
        saveUninitialized:false
    },
    database: {
        uri: process.env.DATABASE_URI || 'mongodb://dev:lId-Jer-wa-H@ds053300.mongolab.com:53300/awdg',
        options: {
            replset: {
                rs_name: process.env.DATABASE_REPLICA_SET
            }
        }
    },
    services: {
        mandrill: {
            api_key: process.env.MANDRILL_API_KEY || '',
            sender: {
                name: process.env.MANDRILL_SENDER_NAME || '',
                email: process.env.MANDRILL_SENDER_EMAIL || '',
                reply_to: process.env.MANDRILL_REPLY_TO || ''
            },
            host: process.env.MANDRILL_HOST || ''
        },
        mailchimp: {
            api_key: process.env.MAILCHIMP_API_KEY || '',
            list_id: process.env.MAILCHIMP_LIST_ID || '',
            groupings_id: process.env.MAILCHIMP_GROUPINGS_ID || ''
        },
        stripe: {
            secret_key: process.env.STRIPE_SECRET_KEY || '',
            publishable_key: process.env.STRIPE_PUBLISHABLE_KEY || ''
        },
        meetup: {
            api_key: process.env.MEETUP_API_KEY || ''
        }

    }
}



/**
 * Database
 * Load the mongoose instance
 */
var db = require('./modules/mongoose')(config);

var core ={
    config:config,
    db:db
};

module.exports = core;