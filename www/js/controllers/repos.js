angular.module('controller.repos', ['ionic'])

.controller('ReposCtrl', function($scope, $state, $stateParams, $window, LoadingService, RequestService, AccountsService, AlertService, MemoryService) {

    LoadingService.show();

    var loginId = $stateParams.loginid;
    var pro = $stateParams.isPro;

    $scope.fetch = function() {
        RequestService
            .request("GET", '/repos/' + loginId, pro, false)
            .then(function(data) {

                console.log("Success-Repos!");
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
                AlertService.raiseAlert("Oops! We couldn't get your repositories from Travis CI. Please try again.");
                LoadingService.hide();

            })
            .finally(function() {

                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');

            });
    };

    $scope.fetch();

    $scope.goTo = function (id, repoName) {
        MemoryService.setRepoName(repoName);
        $state.go('app.builds', { repoid: id });
    };

});
