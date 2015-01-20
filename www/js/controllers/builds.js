angular.module('controller.builds', [])

.controller('BuildsCtrl', function($scope, $stateParams, $window, RequestService, LoadingService) {

    var repoId = $stateParams.repoid;
    var token = $window.localStorage.travistoken;

    LoadingService.show();

    $scope.fetch = function() {


        RequestService
            .request("GET", '/builds?repository_id=' + repoId + '/builds/', true)

            .then(function(data) {

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

            }, function(data) {

                // Failure
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