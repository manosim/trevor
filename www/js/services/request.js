var services = angular.module('services.request', ['ionic']);

services.factory('RequestService', function (AccountsService, $q, $window, $http) {

    var publicUrl = "https://api.travis-ci.org";
    var privateUrl = "https://api.travis-ci.com";

    // Get token wheather Pro or not
    var token, domain;
    if (AccountsService.isPro) {
        token = $window.localStorage.travisprotoken;
        domain = privateUrl;
    } else {
        token = $window.localStorage.travistoken;
        domain = publicUrl;
    }

    var service = {

        request: function (method, url, data) {

            var deferred = $q.defer();

            var headers = {
                'Accept': 'application/vnd.travis-ci.2+json',
                'Authorization': 'token ' + token,
                // 'User-Agent': 'MyClient/1.0.0',
                // 'Host': 'api.travis-ci.org',
                // 'Content-Type': 'application/json',
                // 'Content-Length': 37
            };

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