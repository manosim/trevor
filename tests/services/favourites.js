/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the FavouritesService.", function () {

    var scope, windowMock, favouritesService;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector, FavouritesService) {

            scope = $injector.get('$rootScope');
            windowMock = $injector.get('$window');
            favouritesService = FavouritesService;

        });

    });

    it("Should add and remove favourites.", function () {

        var favourites;

        // Mock analytics
        windowMock.analytics = {
            trackEvent: function() {

            }
        }

        favouritesService.addFavourite("123");
        favouritesService.addFavourite("456");
        favouritesService.addFavourite("789");

        favourites = favouritesService.getFavourites();
        expect(favourites.length).toEqual(3);

        favouritesService.removeFavourite("789");
        favourites = favouritesService.getFavourites();
        expect(favourites.length).toEqual(2);

        windowMock.analytics = undefined;

    });

});