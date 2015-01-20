var app = angular.module('controller.accounts', ['ionic']);

app.controller('AccountsCtrl', function($scope, $state, $window, RequestService, AccountsService, LoadingService) {

    LoadingService.show();

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

        });

    $scope.logOut = function() {
        delete $window.localStorage.githubtoken;
        delete $window.localStorage.travistoken;
        $state.go('welcome');
    };

});