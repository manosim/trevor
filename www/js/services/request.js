var services = angular.module('services.request', ['ionic']);

services.factory('RequestService', function (AccountsService, $q, $window, $http) {

    // Get token wheather Pro or not
    var domain, host;

    if (AccountsService.isPro()) {
        domain = "https://api.travis-ci.com";
        host = "api.travis-ci.com";
    } else {
        domain = "https://api.travis-ci.org";
        host = "api.travis-ci.org";
    }

    var service = {

        token: false,

        setToken: function (value) {
            service.token = value;
        },

        request: function (method, url, data) {

            var deferred = $q.defer();

            var headers = {
                'Accept': 'application/vnd.travis-ci.2+json',
                // 'User-Agent': 'MyClient/1.0.0',
                // 'Host': host,
                // 'Content-Type': 'application/json',
                // 'Content-Length': 37
            };

            if (url != "/auth/github") {
                headers['Authorization'] = "token " + service.token;
            }

            console.log("+++++++++++++++++");
            console.log("+++++++++++++++++");
            console.log("REQUEST to: " + domain + url);
            console.log("+++++++++++++++++");
            console.log("+++++++++++++++++");

            $http({
                url: domain + url,
                method: method,
                headers: headers,
                data : data })
                .success(function (data) {
                    // Success
                    deferred.resolve(data);
                }).error(function (data){
                    // Failure
                    deferred.reject(data);
                });

            return deferred.promise;

        }

    };

    return service;

});