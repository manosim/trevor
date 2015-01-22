var services = angular.module('services.accounts', []);

services.factory('AccountsService', function ($window) {

    var service = {

        accounts: false,
        isPro: true,

        getPro: function () {
            console.log("GETTING PRO");
            return service.isPro;
        },

        setPro: function (value) {
            if (value === true) {
                console.log("SETTING TO PRO");
                service.isPro = true;
            } else {
                console.log("SETTING TO -NOT- PRO");
                service.isPro = false;
            }
        },

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