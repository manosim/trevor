angular.module('controller.builds', [])

.controller('BuildsCtrl', function($scope, $stateParams, $window, $http) {

    var repoId = $stateParams.repoid;

    console.log(repoId);

    var token = $window.localStorage.travistoken;
    console.log(token);

    // Builds
    $http({
        url: 'https://api.travis-ci.org/builds?repository_id=' + repoId + '/builds/',
        method: "GET",
        // data: {token: token},
        headers: {
            // 'User-Agent': 'MyClient/1.0.0',
            'Accept': 'application/vnd.travis-ci.2+json',
            // 'Host': 'api.travis-ci.org',
            // 'Content-Type': 'application/json',
            // 'Content-Length': 37
            'Authorization': 'token ' + token
          }
      }).success(function (data, status, headers, config) {
        console.log("Success-Builds!");
        $scope.builds = data.builds;
      }).error(function (data, status, headers, config) {
        alert("Failure-Builds.");
        console.log(data);
      });

});