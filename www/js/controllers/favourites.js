angular.module('controller.favourites', ['ionic'])

.controller('FavouritesCtrl', function($scope, $stateParams, $window, LoadingService, RequestService, FavouritesService, AccountsService) {

    LoadingService.show();

    var favourites = FavouritesService.getFavourites();

    $scope.repos = [];
    angular.forEach(favourites, function(value, key) {

        RequestService
            .request("GET", '/repos/' + loginId, true)
            .then(function(data) {

                console.log("Success-Repos!");
                angular.forEach(data.repos, function(value, key) {
                        value.short_slug = value.slug.split(loginId + '/')[1];
                        $scope.repos.push(value);
                });

                LoadingService.hide();

            }, function(data) {

                // Failure
                alert("Failure - Repos.");
                console.log(data);
                LoadingService.hide();

            });

    });

});
