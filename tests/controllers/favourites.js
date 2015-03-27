/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the FavouritesCtrl.", function () {

    var scope, state, createController, httpBackend, alertService, favouritesService, memoryService;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector, AlertService, FavouritesService, MemoryService) {

            scope = $injector.get('$rootScope');
            state = $injector.get('$state');
            controller = $injector.get('$controller');
            httpBackend = $injector.get('$httpBackend');
            alertService = AlertService;
            favouritesService = FavouritesService;
            memoryService = MemoryService;

            stateparams = { logid: "123456" };

            createController = function() {
                return controller('FavouritesCtrl', {
                    '$scope' : scope,
                    '$state' : state,
                    '$stateParams' : stateparams,
                    'AlertService': alertService,
                    'FavouritesService': favouritesService,
                    'MemoryService': memoryService,
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

        spyOn(favouritesService, 'getFavourites').and.returnValue(['123123']);
        spyOn(memoryService, 'setRepoName');
        spyOn(state, 'go');

        httpBackend.expectGET("https://api.travis-ci.org/repos/" + 123123).respond(data);

        var controller = createController();

        httpBackend.flush();

        expect(scope.repos[0].id).toEqual(123123);

        scope.goTo(123123, "testRepo");
        expect(memoryService.setRepoName).toHaveBeenCalledWith("testRepo");
        expect(state.go).toHaveBeenCalledWith('app.builds', Object({ repoid: 123123 }));

    });

    it("Should FAIL to get the details for all the favourites repos.", function () {

        spyOn(favouritesService, 'getFavourites').and.returnValue(['123123']);
        spyOn(alertService, 'raiseAlert');

        httpBackend.expectGET("https://api.travis-ci.org/repos/" + 123123).respond(400, "ERROR.");

        var controller = createController();

        httpBackend.flush();

        expect(alertService.raiseAlert).toHaveBeenCalledWith("Oops! We couldn't get your favourites' repos info from Travis CI. Please try again.");

    });

});