var services = angular.module('services.favourites', []);

services.factory('FavouritesService', function ($window) {

    var service = {

        favourites: [],

        getFavourites: function () {
            return service.favourites;
        },

        isFavourite: function (slug) {
            var found = false;
            angular.forEach(service.favourites, function(value, key) {
                if (value.slug == slug && !found) {
                    found = true;
                }
            });
            return found;
        },

        resaveFavourites: function () {
            $window.localStorage.favourites = angular.toJson(service.favourites);
        },

        addFavourite: function (slug, isPro) {
            var favourite = {
                slug: slug,
                isPro: isPro
            };

            service.favourites.push(favourite);
            service.resaveFavourites();

            // Analytics Tracking
            if (typeof analytics !== 'undefined'){
                analytics.trackEvent('Favourites', 'Added Favourite', '');
            }
        },

        removeFavourite: function (slug) {
            angular.forEach(service.favourites, function(value, key) {
                if (value.slug == slug) {
                    service.favourites.splice(key, 1);
                }
            });

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