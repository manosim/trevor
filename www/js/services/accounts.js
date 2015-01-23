var services = angular.module('services.accounts', []);

services.factory('AccountsService', function ($window) {

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
            var token = window.localStorage.travistoken;
            if (token) {
                console.log("Is logged in.");
                return true;
            }
            return false;
        }

    };

  return service;
});