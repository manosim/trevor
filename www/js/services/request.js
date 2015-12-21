var services = angular.module('services.request', ['ionic']);

services.factory('RequestService', function (AccountsService, AlertService, $q, $window, $http) {

  var service = {

    request: function (method, url, pro, data) {

      var deferred = $q.defer();

      var domain, host;
      if (pro == 'false' || pro === false) {
        console.log('REQUEST: IS NOT PRO');
        domain = 'https://api.travis-ci.org';
        host = 'api.travis-ci.org';
      } else if (pro == 'true' || pro === true) {
        domain = 'https://api.travis-ci.com';
        host = 'api.travis-ci.com';
        console.log('REQUEST: IS PRO');
      } else {
        AlertService.raiseAlert('Oops! Something went wrong and we couldn\'t make your request. Please try again.');
      }

      var headers = {
        'Accept': 'application/vnd.travis-ci.2+json',
        'Host': host,
        // 'Content-Type': 'application/json',
        // 'Content-Length': 37
      };

      if ((pro == 'true' || pro === true) && url != '/auth/github') {
        var tokenPro = AccountsService.tokens.pro;
        headers.Authorization = 'token ' + tokenPro;
      }

      if ((pro == 'false' || pro === false) && url == '/accounts?all=true') {
        var tokenOs = AccountsService.tokens.os;
        headers.Authorization = 'token ' + tokenOs;
      }

      $http({
        url: domain + url,
        method: method,
        headers: headers,
        data : data })
        .success(function (data) {
          // Success
          deferred.resolve(data);
        }).error(function (data) {
          // Failure
          deferred.reject(data);
        });


      return deferred.promise;

    },

    requestLog: function (url, pro) {

      var deferred = $q.defer();

      var domain, host;
      if (pro == 'false' || pro === false) {
        console.log('REQUEST: IS NOT PRO');
        domain = 'https://api.travis-ci.org';
        host = 'api.travis-ci.org';
      } else if (pro == 'true' || pro === true) {
        domain = 'https://api.travis-ci.com';
        host = 'api.travis-ci.com';
        console.log('REQUEST: IS PRO');
      } else {
        AlertService.raiseAlert('Oops! Something went wrong and we couldn\'t make your request. Please try again.');
      }

      var headers = {
        'Accept': 'application/json; chunked=true; version=2, text/plain; version=2',
        'User-Agent': 'Trevor/1.5.3',
        'Host': host,
        // 'Content-Type': 'application/json',
        // 'Content-Length': 37
      };

      if ((pro == 'true' || pro === true) && url != '/auth/github') {
        var tokenPro = AccountsService.tokens.pro;
        headers.Authorization = 'token ' + tokenPro;
      }

      $http({
        url: domain + url,
        method: 'GET',
        headers: headers })
        .success(function (data, status, headers) {
          // Success
          var payload = {
            data: data,
            status: status,
          };
          if (status == 204) {
            payload.location = headers('Location');
          }
          deferred.resolve(payload);
        }).error(function (data) {
          // Failure
          deferred.reject(data);
        });


      return deferred.promise;

    },

    requestLogTxt: function (url) {
      var deferred = $q.defer();

      $http({
        url: url,
        method: 'GET'})
        .success(function (data, status, headers, config) {
          // Success
          deferred.resolve(data);
        }).error(function (data) {
          // Failure
          deferred.reject(data);
        });

      return deferred.promise;
    },

  };

  return service;

});
