var app = angular.module('controller.accounts', ['ionic']);

app.controller('AccountsCtrl', function($rootScope, $scope, $state, $window, RequestService, AccountsService, LoadingService, FavouritesService, AlertService) {

    LoadingService.show();

    var isLoggedIn = {
        os: $window.localStorage.travisostoken || false,
        pro: $window.localStorage.travisprotoken || false,
    };

    $scope.accounts = {
        os: false,
        pro: false,
    };

    $scope.login = function(pro) {
        console.log('scope.login: ' + pro);
    };

    var fetchAccounts = function(pro) {

        RequestService
            .request("GET", '/accounts?all=true', pro, false)
            .then(function(data) {

                // Success
                console.log("Success-Accounts! (Pro: "+ pro + ")");

                if (!pro) {
                    $scope.accounts.os = data.accounts;
                } else {
                    $scope.accounts.pro = data.accounts;
                }

                AccountsService.setAccounts(data.accounts, pro);
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

    $scope.fetchData = function() {
        if (isLoggedIn.os) {
            fetchAccounts(false);
        }

        if (isLoggedIn.pro) {
            fetchAccounts(true);
        }
    };

    $scope.fetchData();

    $scope.shouldDisable = function(subscribed, education) {
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
