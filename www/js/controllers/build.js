angular.module('controller.build', [])

.controller('BuildCtrl', function($scope, $stateParams, $window, LoadingService, $http) {

    var buildId = $stateParams.buildid;
    var token = $window.localStorage.travistoken;

    LoadingService.show();

    $scope.fetch = function() {

        $http({
            url: 'https://api.travis-ci.org/builds/' + buildId,
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

                console.log("Success-Build with Id!");
                $scope.build = data.build;
                $scope.commit = data.commit;
                $scope.jobs = data.jobs;

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

    $scope.openCompare = function() {
        var compareWindow = window.open($scope.commit.compare_url, '_system', '');
    };

});