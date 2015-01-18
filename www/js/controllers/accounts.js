var app = angular.module('controller.accounts', ['ionic']);

app.controller('AccountsCtrl', function($scope, $state, $window, $http, AccountsService, LoadingService) {

    LoadingService.show();

    var token = $window.localStorage.travistoken;

    $http({
        url: 'https://api.travis-ci.org/accounts?all=true',
        method: "GET",
        headers: {
            'Accept': 'application/vnd.travis-ci.2+json',
            'Authorization': 'token ' + token,
            // 'User-Agent': 'MyClient/1.0.0',
            // 'Host': 'api.travis-ci.org',
            // 'Content-Type': 'application/json',
            // 'Content-Length': 37
          }
      }).success(function (data, status, headers, config) {

        console.log("Success-Accounts!");
        AccountsService.setAccounts(data.accounts);
        $scope.accounts = data.accounts;
        LoadingService.hide();

      }).error(function (data, status, headers, config) {

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