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

        favouritesService.addFavourite("ekonstantinidis/travis-mobile", "true");
        favouritesService.addFavourite("ekonstantinidis/ionic-project-template", "false");

        var iptFav = favouritesService.isFavourite("ekonstantinidis/ionic-project-template");
        expect(iptFav).toBeTruthy();

        expect(favouritesService.favourites.length).toEqual(2);

        favouritesService.removeFavourite("ekonstantinidis/ionic-project-template");

        expect(favouritesService.favourites.length).toEqual(1);

        var iptFavAfter = favouritesService.isFavourite("ekonstantinidis/ionic-project-template");
        expect(iptFavAfter).toBeFalsy();

        windowMock.analytics = undefined;

    });


    it("Should remove all favourites.", function () {

        favouritesService.removeAll();

        favouritesService.addFavourite("ekonstantinidis/travis-mobile", "true");
        favouritesService.addFavourite("ekonstantinidis/ionic-project-template", "false");

        expect(favouritesService.favourites.length).toEqual(2);

        favouritesService.removeAll();

        expect(favouritesService.favourites.length).toEqual(0);

    });


    it("Should get all favourites.", function () {

        favouritesService.removeAll();

        favouritesService.addFavourite("ekonstantinidis/travis-mobile", "true");
        favouritesService.addFavourite("ekonstantinidis/ionic-project-template", "false");

        var favourites = favouritesService.getFavourites();

        expect(favourites.length).toEqual(2);
        expect(favourites[0].slug).toBe("ekonstantinidis/travis-mobile");
        expect(favourites[0].isPro).toBe("true");
        expect(favourites[1].slug).toBe("ekonstantinidis/ionic-project-template");
        expect(favourites[1].isPro).toBe("false");

    });

});