var services = angular.module('services.accounts', []);

services.factory('AccountsService', function (FavouritesService, $window) {

    var service = {

        accounts: {
            os: false,
            pro: false,
        },

        tokens: {
            os: false,
            pro: false,
        },

        setTokens: function () {
            service.tokens.os = $window.localStorage.travisostoken || false;
            service.tokens.pro = $window.localStorage.travisprotoken || false;
        },

        getAccounts: function () {
            if (service.isLoggedIn()) {
                return service.accounts;
            }
        },

        setAccounts: function (accountsData, pro) {
            if (!pro) {
                service.accounts.os = accountsData;
            } else if (pro) {
                service.accounts.pro = accountsData;
            }
        },

        isLoggedIn: function () {
            var tokenOs = $window.localStorage.travisostoken || false;
            var tokenPro = $window.localStorage.travisprotoken || false;
            return {
                os: tokenOs,
                pro: tokenPro,
            };
        },

        logOut: function () {
            if (service.isLoggedIn()) {
                service.accounts = false;
                FavouritesService.removeAll();
                delete $window.localStorage.travisostoken;
                delete $window.localStorage.travisprotoken;

                // Analytics Tracking
                if (typeof analytics !== 'undefined'){
                    analytics.trackEvent('Accounts', 'Logged Out', '');
                }
            }
        }

    };

  return service;
});