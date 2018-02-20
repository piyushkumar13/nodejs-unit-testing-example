var q = require('q');

function AuthController() {

    var roles;

    function setRoles(role) {
        roles = role;
    }

    function isAuthorized(roles, neededRole) {
        return roles.indexOf(neededRole) >= 0;
    }

    function isAuthorizedAsync(roles, neededRole, cb) {
        setTimeout(function () {
            cb(roles.indexOf(neededRole) >= 0);
        }, 2100)
    }

    function isAuthorizedForHooks(neededRole) {
        return roles.indexOf(neededRole) >= 0;
    }

    function getIndex(req, res) {

        if (req.user.isUser()) {
            return res.render("index");
        }
    }


    function sumAsPromise(a, b) {
        var deferred = q.defer();

        var sum = a + b;
        if (sum === 4) {
            deferred.resolve(sum);
        } else {
            deferred.reject(sum);
        }

        return deferred.promise;
    }

    return {
        isAuthorized: isAuthorized,
        isAuthorizedAsync: isAuthorizedAsync,
        isAuthorizedForHooks: isAuthorizedForHooks,
        setRoles: setRoles,
        getIndex: getIndex,
        sumAsPromise: sumAsPromise

    };
}

module.exports = AuthController();