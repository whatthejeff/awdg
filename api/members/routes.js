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

router.get('/members', function(req, res) {
    res.send({
        id: "1",
        name: "Nic Rosenthal"
    });
});

module.exports = router;