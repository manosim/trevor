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
                console.log("Is Favourite.");
                return true;
            }
            console.log("Is NOT Favourite.");
            return false;
        },

        resaveFavourites: function () {
            $window.localStorage.favourites =  angular.toJson(service.favourites);
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
            service.favourites = angular.fromJson($window.localStorage.favourites);
        },

        removeAll: function () {
            delete $window.localStorage.favourites;
            service.resaveFavourites();
        }

    };

  return service;
});