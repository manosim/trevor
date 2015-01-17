var app = angular.module('controller.accounts', ['ionic']);

app.controller('AccountsCtrl', function($scope, $window, $http) {

    var token = $window.localStorage.travistoken;
    console.log("Travis Token: " + token);

    $http({
        url: 'https://api.travis-ci.org/accounts?all=true',
        method: "GET",
        headers: {
            'Accept': 'application/vnd.travis-ci.2+json',
            'Authorization': 'token ' + token,
            // 'User-Agent': 'MyClient/1.0.0',
            // 'Host': 'api.travis-ci.org',
            // 'Content-Type': 'application/json',
            // 'Content-Length': 37
          }
      }).success(function (data, status, headers, config) {
        console.log("Success-Repos!");
        console.log(data);
        $scope.accounts = data.accounts;
      }).error(function (data, status, headers, config) {
        alert("Failure.");
        console.log(data);
      });

});