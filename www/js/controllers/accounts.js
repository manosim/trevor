var app = angular.module('controller.accounts', ['ionic']);

app.controller('AccountsCtrl', function($scope, $state, $window, RequestService, AccountsService, LoadingService, FavouritesService) {

    LoadingService.show();

    $scope.pro = AccountsService.getPro();

    $scope.fetch = function() {

        RequestService
            .request("GET", '/accounts?all=true', true)
            .then(function(data) {

                // Success
                console.log("Success-Accounts!");
                AccountsService.setAccounts(data.accounts);
                $scope.accounts = data.accounts;
                LoadingService.hide();

            }, function(data) {

                // Failure
                alert("Failure-Accounts.");
                console.log(data);
                LoadingService.hide();

            }).finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });

    };

    $scope.fetch();

    $scope.logOut = function() {
        AccountsService.logOut();
        $state.go('welcome');
    };

});


app.controller('LogoutCtrl', function($scope, $state, AccountsService) {

    AccountsService.logOut();
    $state.go('welcome');

});
