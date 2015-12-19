var services = angular.module('services.accounts', []);

services.factory('AccountsService', function (FavouritesService, $window) {

  var service = {

    accounts: {
      os: false,
      pro: false,
    },

    tokens: {
      os: $window.localStorage.travisostoken || false,
      pro: $window.localStorage.travisprotoken || false,
    },

    getAccounts: function () {
      return service.accounts;
    },

    setAccounts: function (accountsData, pro) {
      if (pro === false || pro == 'false') {
        service.accounts.os = accountsData;
      } else if (pro === true || pro == 'true') {
        service.accounts.pro = accountsData;
      }
    },

    isLoggedIn: function () {

      var isLoggedInOs = false;
      var isLoggedInPro = false;
      if (service.tokens.os) { isLoggedInOs = true; }
      if (service.tokens.pro) { isLoggedInPro = true; }

      return {
        os: isLoggedInOs,
        pro: isLoggedInPro,
      };
    },

    logOut: function () {
      service.accounts.os = false;
      service.accounts.pro = false;
      service.tokens.os = false;
      service.tokens.pro = false;

      delete $window.localStorage.travisostoken;
      delete $window.localStorage.travisprotoken;

      FavouritesService.removeAll();

      // Analytics Tracking
      if (typeof analytics !== 'undefined') {
        analytics.trackEvent('Accounts', 'Logged Out', '');
      }
    }

  };

  return service;
});
