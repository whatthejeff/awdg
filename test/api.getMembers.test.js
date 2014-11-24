'use strict';
var mongoose = require('mongoose');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var config = require('../config/env');
require(config.root + '/config/mongoose')(mongoose);


var getMembers = require('../api/members/getMembers');


describe("Member Routes", function() {

    describe("GET Members", function() {
        it("should respond", function() {
            var req, res, spy;

            req = res = {};
            spy = res.send = sinon.spy();

            getMembers(req, res);
            expect(spy.calledOnce).to.equal(true);
        });

    });

});