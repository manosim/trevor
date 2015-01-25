angular.module('controller.favourites', ['ionic'])

.controller('FavouritesCtrl', function($scope, $stateParams, $window, LoadingService, RequestService, FavouritesService, AccountsService) {

    var favourites = FavouritesService.getFavourites();
    $scope.repos = [];

    if (favourites.length > 0) {
        LoadingService.show();

        angular.forEach(favourites, function(value, key) {

            RequestService
                .request("GET", '/repos/' + value, true)
                .then(function(data) {

                    console.log("Success-Repos!");
                    $scope.repos.push(data.repo);
                    LoadingService.hide();

                    console.log($scope.repos);

                }, function(data) {

                    // Failure
                    alert("Failure - Repos.");
                    console.log(data);
                    LoadingService.hide();

                });

        });
    }

});
