var services = angular.module('services.accounts', []);

services.factory('AccountsService', function ($window, $http) {

    var service = {

        accounts: false,
        hasOrganization: false,
        isPro: false,

        setAccounts: function (accountsData) {
            if (service.isLoggedIn()) {
                service.accounts = accountsData;
                service.checkIfOrganization();
            }
        },

        getAccounts: function () {
            if (service.isLoggedIn()) {
                return service.accounts;
            }
        },

        checkIfOrganization: function () {

            angular.forEach(service.accounts, function(value, key) {
                if (value.type == "organization") {
                    service.hasOrganization = true;
                }
            });

        },

        isLoggedIn: function () {
          return ($window.localStorage.travistoken !== undefined);
        }

    };

  return service;
});