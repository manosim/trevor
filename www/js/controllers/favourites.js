angular.module('controller.favourites', ['ionic'])

.controller('FavouritesCtrl', function($scope, $stateParams, $window, LoadingService, RequestService, FavouritesService, AccountsService, AlertService) {

    var favourites = FavouritesService.getFavourites();
    $scope.repos = [];

    if (favourites.length > 0) {
        LoadingService.show();

        angular.forEach(favourites, function(value, key) {

            RequestService
                .request("GET", '/repos/' + value, true)
                .then(function(data) {

                    console.log("Success-Favourite Repo!");
                    $scope.repos.push(data.repo);
                    LoadingService.hide();

                }, function(data) {

                    // Failure
                    AlertService.raiseAlert("Oops! We couldn't get your favourites' repos info from Travis CI. Please try again.");
                    LoadingService.hide();

                });

        });
    }

});
