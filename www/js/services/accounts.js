var services = angular.module('services.accounts', []);

services.factory('AccountsService', function ($window, $http) {

  var service = {
    accounts: false,

    setAccounts: function (accountsData) {
        if (service.isLoggedIn()) {
            service.accounts = accountsData;
        }
    },

    getAccounts: function () {
        if (service.isLoggedIn()) {
            return service.accounts;
        }
    },

    isLoggedIn: function () {
      return ($window.localStorage.travistoken !== undefined);
    }

  };

  return service;
});