angular.module('controller.builds', [])

.controller('BuildsCtrl', function($scope, $stateParams, $window, LoadingService, $http) {

    var repoId = $stateParams.repoid;
    var token = $window.localStorage.travistoken;

    LoadingService.show();

    $scope.fetch = function() {

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
                $scope.builds = [];

                angular.forEach(data.builds, function(buildValue, key) {
                    angular.forEach(data.commits, function(commitValue, key) {

                        if (buildValue.commit_id == commitValue.id) {
                            buildValue.commit = commitValue;
                            $scope.builds.push(buildValue);
                        }
                    });
                });

                LoadingService.hide();

            }).error(function (data, status, headers, config) {

                alert("Failure-Builds.");
                console.log(data);
                LoadingService.hide();

            })
            .finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });

    };

    $scope.fetch();

});