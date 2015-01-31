angular.module('controller.favourites', ['ionic'])

.controller('FavouritesCtrl', function($scope, $state, $stateParams, $window, LoadingService, RequestService, FavouritesService, AccountsService, AlertService, MemoryService) {

    var favourites = FavouritesService.getFavourites();
    $scope.repos = [];

    if (favourites.length > 0) {
        LoadingService.show();

        angular.forEach(favourites, function(value, key) {
            RequestService
                .request("GET", '/repos/' + value, true)
                .then(function(data) {
                    console.log("Success-Favourite Repo!");
                    data.repo.short_slug = data.repo.slug.split('/')[1];
                    $scope.repos.push(data.repo);
                    LoadingService.hide();
                }, function(data) {
                    // Failure
                    AlertService.raiseAlert("Oops! We couldn't get your favourites' repos info from Travis CI. Please try again.");
                    LoadingService.hide();
                });
        });
    }

    $scope.goTo = function (id, repoName) {
        MemoryService.setRepoName(repoName);
        $state.go('app.builds', { repoid: id });
    };

});
