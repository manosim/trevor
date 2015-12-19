angular.module('controller.builds', [])

.controller('BuildsCtrl', function($scope, $stateParams, RequestService, LoadingService, FavouritesService, AlertService) {

  var slug = $stateParams.loginid + '/' + $stateParams.repo;
  var isPro = $scope.isPro = $stateParams.ispro;
  $scope.repoName = slug;

  LoadingService.show();

  $scope.fetchData = function() {

    RequestService
      .request('GET', '/repos/' + slug + '/builds', isPro, true)

      .then(function(data) {

        console.log('Success-Builds!');
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
        AlertService.raiseAlert('Oops! We couldn\'t get this repo\'s builds from Travis CI. Please try again.');
        LoadingService.hide();
      })
      .finally(function() {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });

  };

  $scope.fetchData();

  $scope.isFavourite = FavouritesService.isFavourite(slug);

  $scope.toggleFavourite = function () {
    console.log('isFavourite: ' + $scope.isFavourite);
    if ($scope.isFavourite) {
      FavouritesService.removeFavourite(slug);
    } else {
      FavouritesService.addFavourite(slug, isPro);
    }
    $scope.isFavourite = !$scope.isFavourite;
  };

});
