/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the FavouritesCtrl.", function () {

    var scope, createController, httpBackend, alertService, favouritesService;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector, AlertService, FavouritesService) {

            scope = $injector.get('$rootScope');
            controller = $injector.get('$controller');
            httpBackend = $injector.get('$httpBackend');
            alertService = AlertService;
            favouritesService = FavouritesService;

            createController = function() {
                return controller('FavouritesCtrl', {
                    '$scope' : scope,
                    'AlertService': alertService,
                    'FavouritesService': favouritesService,
                });
            };
        });
    });

    it("Should get the details for all the favourites repos.", function () {

        data = {
            "repo": {
                "id": 123123,
                "slug": "johndoe/Where-am-I",
                "description": "A simple app in Swift that uses Core Location & MapKit",
                "last_build_id": "123213213",
                "last_build_number": 89,
                "last_build_state": "passed",
                "last_build_duration": "65",
                "last_build_language": "python",
                "last_build_started_at": null,
                "last_build_finished_at": null,
                "active": null,
                "github_language": "Swift"
            }
        };

        spyOn(favouritesService, 'getFavourites').and.returnValue([
            {
                slug: "ekonstantinidis/test",
                isPro: false
            }
        ]);

        httpBackend.expectGET("https://api.travis-ci.org/repos/ekonstantinidis/test").respond(data);

        var controller = createController();

        httpBackend.flush();

        expect(scope.repos[0].id).toEqual(123123);

    });

    it("Should try to get the details for 0(zero) favourites.", function () {

        spyOn(favouritesService, 'getFavourites').and.returnValue([]);
        spyOn(scope, '$broadcast');

        var controller = createController();

        expect(scope.$broadcast).toHaveBeenCalled();

    });

    it("Should FAIL to get the details for all the favourites repos.", function () {

        spyOn(favouritesService, 'getFavourites').and.returnValue([
            {
                slug: "ekonstantinidis/test",
                isPro: false
            }
        ]);

        spyOn(alertService, 'raiseAlert');

        httpBackend.expectGET("https://api.travis-ci.org/repos/ekonstantinidis/test").respond(400, "ERROR.");

        var controller = createController();

        httpBackend.flush();

        expect(alertService.raiseAlert).toHaveBeenCalledWith("Oops! We couldn't get your favourites' repos info from Travis CI. Please try again.");

    });

});