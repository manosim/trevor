var services = angular.module('services.request', ['ionic']);

services.factory('RequestService', function (AccountsService, AlertService, $q, $window, $http) {

    var service = {

        request: function (method, url, pro, data) {

            var deferred = $q.defer();

                var domain, host;

                if (!pro) {
                    console.log("REQUEST: IS NOT PRO");
                    domain = "https://api.travis-ci.org";
                    host = "api.travis-ci.org";
                } else if (pro) {
                    domain = "https://api.travis-ci.com";
                    host = "api.travis-ci.com";
                    console.log("REQUEST: IS PRO");
                }

                var headers = {
                    'Accept': 'application/vnd.travis-ci.2+json',
                    // 'User-Agent': 'MyClient/1.0.0',
                    // 'Host': host,
                    // 'Content-Type': 'application/json',
                    // 'Content-Length': 37
                };

                if (url != "/auth/github") {
                    var token;
                    if (!pro) {
                        token = AccountsService.tokens.os;
                    } else if (pro) {
                        token = AccountsService.tokens.pro;
                    }
                    console.log("Travis Token: " + token);
                    headers.Authorization = "token " + token;
                }

                if (url.indexOf("logs") > -1) {
                    headers.Accept = "text/plain";
                }

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