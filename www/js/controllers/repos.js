angular.module('controller.repos', ['ionic'])

.controller('ReposCtrl', function($scope, $stateParams, $window, LoadingService, RequestService, AccountsService) {

    LoadingService.show();

    var loginId = $stateParams.loginid;

    $scope.fetch = function() {
        RequestService
            .request("GET", '/repos/' + loginId, true)
            .then(function(data) {

                console.log("Success-Repos!");
                $scope.repos = [];
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

            })
            .finally(function() {

                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');

            });
    };

    $scope.fetch();

});
