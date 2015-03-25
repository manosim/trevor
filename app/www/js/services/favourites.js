var services = angular.module('services.favourites', []);

services.factory('FavouritesService', function ($window) {

    var service = {

        favourites: [],

        getFavourites: function () {
            return service.favourites;
        },

        isFavourite: function (id) {
            var index = service.favourites.indexOf(id);

            if (index > -1) {
                return true;
            }
            return false;
        },

        resaveFavourites: function () {
            $window.localStorage.favourites = angular.toJson(service.favourites);
        },

        addFavourite: function (value) {
            service.favourites.push(value);
            service.resaveFavourites();

            // Analytics Tracking
            if (typeof analytics !== 'undefined'){
                analytics.trackEvent('Favourites', 'Added Favourite', '');
            }
        },

        removeFavourite: function (value) {
            var index = service.favourites.indexOf(value);

            if (index > -1) {
                service.favourites.splice(index, 1);
            }
            service.resaveFavourites();

            // Analytics Tracking
            if (typeof analytics !== 'undefined'){
                analytics.trackEvent('Favourites', 'Removed Favourite', '');
            }
        },

        loadFavourites: function () {
            var data = angular.fromJson($window.localStorage.favourites);
            angular.forEach(data, function(value, key) {
                service.favourites.push(value);
            });
        },

        removeAll: function () {
            delete $window.localStorage.favourites;
            service.favourites = [];
        }

    };

  return service;
});