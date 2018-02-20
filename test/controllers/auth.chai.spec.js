var expect = require("chai").expect;
var should = require("chai").should();
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
var authController = require("../../controllers/auth.controller.js");

describe("AuthController", function () {

    describe("isAuthorized", function () {

        it('should return false', function () {
            var auth = authController.isAuthorized(["user"], "admin");
            expect(auth).to.be.false;
        });

        it("should return true", function () {
            var auth = authController.isAuthorized(["user", "admin"], "admin");
            auth.should.be.true;
        });
    });

    describe("isAuthorizedAsync", function () {

        it('should return false', function (done) {

            this.timeout(2500);
            authController.isAuthorizedAsync(["user"], "admin", function (isAuth) {
                expect(isAuth).to.be.false;
                done();
            });
        });

        it('should return true', function (done) {

            /* Overrides the time period of mocha which is by default 2000 ms. */
            this.timeout(2500);
            authController.isAuthorizedAsync(["user", "admin"], "admin", function (isAuth) {
                isAuth.should.be.true;
                done();
            });
        });
    });

    describe("isAuthorizedForHooks", function () {

        beforeEach(function () { // it will be called for both the below test cases.
            console.log("Calling hook before each test case");
            authController.setRoles(["user"]);
        });

        it('should return false', function () {
            authController.isAuthorizedForHooks("admin").should.be.false;
        });

        it("should return true", function () {
            authController.setRoles(["user", "admin"]);
            expect(authController.isAuthorizedForHooks("admin")).to.be.true;
        });

    });

    describe("Testing objects", function () {
        var objA = {
            name: 'Piyush',
            gender: 'male'
        };

        var obj = {
            name: 'Piyush',
            gender: 'male'
        };

        var objB = {
            name: 'Kumar',
            gender: 'male'
        };

        var objC = null;
        it('should test object.', function () {
            expect(objA).to.have.property('name').equal('Piyush');
            objA.should.have.property('gender').equal('male')
        });

        it('should test object equality', function () {
            expect(objA).to.be.deep.equal(obj);
            objA.should.be.deep.equal(obj);
        });

        it('should test null object', function () {
            expect(objC).to.be.null;
            should.not.exist(objC); // here, we cant use objC.should.be.null since it will throw exception as we are calling method on null obj.
        });
    });

    describe("Testing promise", function () {

        it('should reslove promise', function () {
            return authController.sumAsPromise(2,2).should.be.fulfilled;
        });

        it('should reslove promise by value 4', function () {
            return authController.sumAsPromise(2,2).should.eventually.equal(4);
        });

        it('should reject promise', function () {
            return authController.sumAsPromise(2,3).should.be.rejected;
        });

        it('should reject promise by value ', function () {
            return authController.sumAsPromise(2,3).should.be.rejectedWith(5);
        });

    })

});