/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the SearchCtrl.", function () {

    var scope, createController, loadingService, alertService;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector, AlertService, LoadingService) {

            scope = $injector.get('$rootScope');
            controller = $injector.get('$controller');
            httpBackend = $injector.get('$httpBackend');
            alertService = AlertService;
            loadingService = LoadingService;

            createController = function() {
                return controller('SearchCtrl', {
                    '$scope' : scope,
                    'LoadingService' : loadingService,
                    'AlertService' : alertService,
                });
            };
        });
    });

    it("Should make a seach with and without keywords.", function () {

        data = {
            "repos": [
                {
                    "id": 3334162,
                    "slug": "johndoe/Where-am-I",
                    "description": "A simple app in Swift that uses Core Location & MapKit",
                    "last_build_id": "123213213",
                    "last_build_number": 89,
                    "last_build_state": "passed",
                    "last_build_duration": "65",
                    "last_build_language": "python",
                    "last_build_started_at": null,
                    "last_build_finished_at": null,
                    "active": true,
                    "github_language": "Swift"
                },
                {
                    "id": 2829000,
                    "slug": "anotherdoe/django-nicend",
                    "description": "A bootstrap backend template. More info coming soon.",
                    "last_build_id": 55733078,
                    "last_build_number": "35",
                    "last_build_state": "passed",
                    "last_build_duration": 32,
                    "last_build_language": null,
                    "last_build_started_at": "2015-03-25T00:08:59Z",
                    "last_build_finished_at": "2015-03-25T00:09:31Z",
                    "active": true,
                    "github_language": "HTML"
                }
            ]
        };

        var controller = createController();

        // With keywords
        httpBackend.expectGET("https://api.travis-ci.org/repos?orderBy=name&active=true&search=my keyword").respond(data);

        scope.doSearch("my keyword");

        httpBackend.flush();

        expect(scope.results.length).toEqual(2);

        // Without keywords
        httpBackend.expectGET("https://api.travis-ci.org/repos?orderBy=name&active=true").respond(data);

        scope.doSearch();

        httpBackend.flush();

        expect(scope.results.length).toEqual(2);
    });


    it("Should FAIL make a seach with and without keywords.", function () {

        spyOn(alertService, 'raiseAlert');

        var controller = createController();

        httpBackend.expectGET("https://api.travis-ci.org/repos?orderBy=name&active=true").respond(400, "ERROR.");

        scope.doSearch();

        httpBackend.flush();

        expect(alertService.raiseAlert).toHaveBeenCalledWith("Oops! We couldn't get the search results from Travis CI. Please try again.");
    });


});