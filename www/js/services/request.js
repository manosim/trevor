var services = angular.module('services.request', ['ionic']);

services.factory('RequestService', function (AccountsService, $q, $window, $http) {

    var publicUrl = "https://api.travis-ci.org";
    var privateUrl = "https://api.travis-ci.com";

    // Get token wheather Pro or not
    var domain;

    if (AccountsService.isPro) {
        domain = privateUrl;
    } else {
        domain = publicUrl;
    }

    var service = {

        token: $window.localStorage.travistoken,

        request: function (method, url, data) {

            var deferred = $q.defer();

            var headers = {
                'Accept': 'application/vnd.travis-ci.2+json',
                // 'User-Agent': 'MyClient/1.0.0',
                // 'Host': 'api.travis-ci.org',
                // 'Content-Type': 'application/json',
                // 'Content-Length': 37
            };

            if (url != "/auth/github") {
                headers['Authorization'] = "token " + service.token;
            }
            console.log(headers);

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