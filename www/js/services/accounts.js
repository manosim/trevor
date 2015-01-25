var services = angular.module('services.accounts', []);

services.factory('AccountsService', function (FavouritesService, $window) {

    var service = {

        accounts: false,
        isPro: true,

        getPro: function () {
            return service.isPro;
        },

        setPro: function (value) {
            if (value === false) {
                service.isPro = false;
            } else {
                service.isPro = true;
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
                delete $window.localStorage.githubtoken;
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