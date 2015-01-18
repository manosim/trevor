angular.module('controller.repos', ['ionic'])

.controller('ReposCtrl', function($scope, $stateParams, $window, AccountsService, $http) {

    var loginId = $stateParams.loginid;

    var token = $window.localStorage.travistoken;

    $scope.fetch = function() {
        $http({
            url: 'https://api.travis-ci.org/repos/' + loginId,
            method: "GET",
            headers: {
                // 'User-Agent': 'MyClient/1.0.0',
                'Accept': 'application/vnd.travis-ci.2+json',
                // 'Host': 'api.travis-ci.org',
                // 'Content-Type': 'application/json',
                // 'Content-Length': 37
                'Authorization': 'token ' + token
              }
            }).success(function (data, status, headers, config) {
                console.log("Success-Repos!");

                $scope.repos = [];
                angular.forEach(data.repos, function(value, key) {
                        value.short_slug = value.slug.split(loginId + '/')[1];
                        $scope.repos.push(value);
                });

            }).error(function (data, status, headers, config) {
                alert("Failure.");
                console.log(data);
            })
            .finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
    };

    $scope.fetch();

});
