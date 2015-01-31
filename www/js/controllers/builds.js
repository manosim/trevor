angular.module('controller.builds', [])

.controller('BuildsCtrl', function($scope, $stateParams, $window, RequestService, LoadingService, FavouritesService, AlertService, MemoryService) {

    var repoId = $stateParams.repoid;
    var token = $window.localStorage.travistoken;
    $scope.repoName = MemoryService.getRepoName();

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
                AlertService.raiseAlert("Oops! We couldn't get this repo's builds from Travis CI. Please try again.");
                LoadingService.hide();

            })
            .finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });

    };

    $scope.fetch();

    $scope.isFavourite = FavouritesService.isFavourite(repoId);

    $scope.addFavourites = function () {
        if (FavouritesService.isFavourite(repoId)) {
            FavouritesService.removeFavourite(repoId);
        } else {
            FavouritesService.addFavourite(repoId);
        }
        $scope.isFavourite = !$scope.isFavourite;
    };

});