angular.module('controller.builds', [])

.controller('BuildsCtrl', function($scope, $window, $http) {


    var token = $window.localStorage.travistoken;
    console.log(token);

    $http({
        url: 'https://api.travis-ci.org/repos',
        method: "GET",
        // data: {token: token},
        headers: {
            // 'User-Agent': 'MyClient/1.0.0',
            'Accept': 'application/vnd.travis-ci.2+json',
            // 'Host': 'api.travis-ci.org',
            // 'Content-Type': 'application/json',
            // 'Content-Length': 37
            'Authorization': 'token' + token
          }
      }).success(function (data, status, headers, config) {
        console.log("Success-Repos!");
        console.log(data);
        $scope.repos = data.repos;
      }).error(function (data, status, headers, config) {
        alert("Failure.");
        console.log(data);
      });


    // Builds
    $http({
        url: 'https://api.travis-ci.org/builds',
        method: "GET",
        // data: {token: token},
        headers: {
            // 'User-Agent': 'MyClient/1.0.0',
            'Accept': 'application/vnd.travis-ci.2+json',
            // 'Host': 'api.travis-ci.org',
            // 'Content-Type': 'application/json',
            // 'Content-Length': 37
            // 'Authorization': 'token' + token
          }
      }).success(function (data, status, headers, config) {
        console.log("Success-Builds!");
        $scope.builds = data;
      }).error(function (data, status, headers, config) {
        alert("Failure-Builds.");
        console.log(data);
      });







});
