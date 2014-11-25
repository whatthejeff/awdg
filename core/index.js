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

// mailchimp
// stripe
// hull
//

var config = awdg('core/lib/config');
/**
 * Database
 * Load the mongoose instance
 */
var database = awdg('core/lib/mongoose')(config);

var core = {
    database: database,
    mail:{},
    hull:{},
    stripe:{}
}
module.exports = core;