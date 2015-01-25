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
        },

        removeFavourite: function (value) {
            var index = service.favourites.indexOf(value);

            if (index > -1) {
                service.favourites.splice(index, 1);
            }
            service.resaveFavourites();
        },

        loadFavourites: function () {
            var data = angular.fromJson($window.localStorage.favourites);
            angular.forEach(data, function(value, key) {
                service.favourites.push(value);
            });
        },

        removeAll: function () {
            delete $window.localStorage.favourites;
            service.resaveFavourites();
        }

    };

  return service;
});