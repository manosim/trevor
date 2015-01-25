var services = angular.module('services.request', ['ionic']);

services.factory('RequestService', function (AccountsService, $q, $window, $http) {

    var service = {

        token: false,

        request: function (method, url, data) {

            var deferred = $q.defer();

            var pro = AccountsService.getPro();

                // Get token wheather Pro or not
                var domain, host;

                if (pro === true || pro === "true") {
                    domain = "https://api.travis-ci.com";
                    host = "api.travis-ci.com";
                    console.log("REQUEST: IS PRO");
                } else if (pro === false || pro === "false") {
                    console.log("REQUEST: IS NOT PRO");
                    domain = "https://api.travis-ci.org";
                    host = "api.travis-ci.org";
                } else {
                    alert("ERROR. No domain. Pro is: " + pro);
                }

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

                if (url.indexOf("logs") > -1) {
                    headers['Accept'] = "text/plain";
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