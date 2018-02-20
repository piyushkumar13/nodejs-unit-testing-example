var expect = require("chai").expect;
var should = require("chai").should();
var sinon = require('sinon');
var authController = require("../../controllers/auth.controller.js");


describe("AuthController", function () {

    describe("Test getIndex", function () {
        it('should test call to res.render method', function () {
            var res = {
                render: sinon.spy()
            };

            var user = {
                isUser: function () {
                    //lets say this function has some logic and returns boolean
                }
            };

            sinon.stub(user, 'isUser').returns(true);

            var req = {
                user: user
            };

            authController.getIndex(req, res);

            res.render.calledOnce.should.be.true;
            res.render.firstCall.args[0].should.equal("index");
        });
    });

});