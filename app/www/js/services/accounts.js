var services = angular.module('services.accounts', []);

services.factory('AccountsService', function (FavouritesService, $window) {

    var service = {

        accounts: false,
        isPro: false,

        getPro: function () {
            return service.isPro;
        },

        setPro: function (value) {
            if (value === true) {
                service.isPro = true;
            } else {
                service.isPro = false;
            }
            $window.localStorage.travispro = service.isPro;
        },

        getAccounts: function () {
            if (service.isLoggedIn()) {
                return service.accounts;
            }
        },

        setAccounts: function (accountsData) {
            if (service.isLoggedIn()) {
                service.accounts = accountsData;
            }
        },

        isLoggedIn: function () {
            var token = window.localStorage.travistoken;
            if (token) {
                return true;
            }
            return false;
        },

        logOut: function () {
            if (service.isLoggedIn()) {
                service.accounts = false;
                FavouritesService.removeAll();
                delete $window.localStorage.travistoken;
                delete $window.localStorage.travispro;

                // Analytics Tracking
                if (typeof analytics !== 'undefined'){
                    analytics.trackEvent('Accounts', 'Logged Out', '');
                }
            }
        }

    };

  return service;
});