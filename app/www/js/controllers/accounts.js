var app = angular.module('controller.accounts', ['ionic']);

app.controller('AccountsCtrl', function($rootScope, $scope, $state, $window, RequestService, AccountsService, LoadingService, FavouritesService, AlertService) {

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
                $scope.greeting = getGreeting(data.accounts);

                // Let the sidemenu know that we now have the accounts
                $rootScope.$broadcast('accountsSet');

                LoadingService.hide();

            }, function(data) {

                // Failure
                AlertService.raiseAlert("Oops! We couldn't get your accounts from Travis CI. Please try again.");
                LoadingService.hide();

            }).finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });

    };

    $scope.fetch();

    $scope.shouldDisable = function(subscribed, education) {
        if (!AccountsService.getPro()) {
            return false;
        }
        if (subscribed || education) {
            return false;
        }
        return true;
    };

    $scope.logOut = function() {
        AccountsService.logOut();
        $state.go('welcome');
    };

    function getGreeting (accounts) {
        var greeting = false;
        angular.forEach(accounts, function(account, key) {
            if (account.type == "user" && !greeting) {
                if (account.name) {
                    greeting = account.name;
                } else {
                    greeting = account.login;
                }
            }
        });
        return greeting;
    }

});


app.controller('LogoutCtrl', function($scope, $state, AccountsService) {

    AccountsService.logOut();
    $state.go('welcome');

});
