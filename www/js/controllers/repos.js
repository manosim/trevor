angular.module('controller.repos', ['ionic'])

.controller('ReposCtrl', function($scope, $stateParams, $window, LoadingService, RequestService, AlertService) {

  LoadingService.show();

  var loginId = $scope.loginId = $stateParams.loginid;
  var isPro = $scope.isPro = $stateParams.ispro;

  $scope.fetch = function() {
    RequestService
        .request('GET', '/repos/' + loginId, isPro, false)
        .then(function(data) {
          console.log('Success-Repos!');
          $scope.repos = [];
          angular.forEach(data.repos, function(value, key) {
            value.short_slug = value.slug.split(loginId + '/')[1];
            if (value.active !== null) {
              $scope.repos.push(value);
            }
          });

          LoadingService.hide();
        }, function(data) {
          // Failure
          AlertService.raiseAlert('Oops! We couldn\'t get your repositories from Travis CI. Please try again.');
          LoadingService.hide();
        })
        .finally(function() {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        });
  };

  $scope.fetch();

});
