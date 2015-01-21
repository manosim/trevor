var services = angular.module('services.accounts', []);

services.factory('AccountsService', function ($window) {

    var service = {

        accounts: false,
        isPro: true,

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