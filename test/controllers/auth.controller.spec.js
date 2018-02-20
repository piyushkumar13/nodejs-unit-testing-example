var assert = require("assert");
var authController = require("../../controllers/auth.controller.js");

describe("AuthController", function () {

    describe("isAuthorized", function () {

        it('should return false', function () {
            assert.equal(false, authController.isAuthorized(["user"], "admin"));

        });

        it("should return true", function () {
            assert.equal(true, authController.isAuthorized(["user", "admin"], "admin"));
        });
    });

    describe("isAuthorizedAsync", function () {

        it('should return false', function (done) {

            this.timeout(2500);
            authController.isAuthorizedAsync(["user"], "admin", function (isAuth) {
                assert.equal(false, isAuth);
                done();
            });
        });

        it('should return true', function (done) {

            /* Overrides the time period of mocha which is by default 2000 ms. */
            this.timeout(2500);
            authController.isAuthorizedAsync(["user", "admin"], "admin", function (isAuth) {
                assert.equal(true, isAuth);
                done();
            });
        });
    });

    describe("isAuthorizedForHooks", function () {

        beforeEach(function(){ // it will be called for both the below test cases.
            console.log("Calling hook before each test case");
            authController.setRoles(["user"]);
        });

        it('should return false', function () {
            assert.equal(false, authController.isAuthorizedForHooks("admin"));
        });

        it("should return true", function () {
            authController.setRoles(["user", "admin"]);
            assert.equal(true, authController.isAuthorizedForHooks("admin"));
        });

    })

});