/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the filter order-objects-by.", function () {

    var scope, filter;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector, $filter) {

            scope = $injector.get('$rootScope');
            filter = $filter;
        });

    });

    it("Should convert seconds to time.", function () {

        data = {
            "repos": [
                {
                    "id": 3334162,
                    "slug": "johndoe/Where-am-I",
                    "description": "A simple app in Swift that uses Core Location & MapKit",
                    "last_build_id": 456,
                    "last_build_number": 89,
                    "last_build_state": "passed",
                    "last_build_duration": "65",
                    "last_build_language": "python",
                    "last_build_started_at": null,
                    "last_build_finished_at": null,
                    "active": null,
                    "github_language": "Swift"
                },
                {
                    "id": 2829000,
                    "slug": "johndoe/django-nicend",
                    "description": "A bootstrap backend template. More info coming soon.",
                    "last_build_id": 123,
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

        var result;

        result = filter('orderObjectBy')(data.repos, "last_build_id", false);

        expect(result[0]['last_build_id']).toEqual(123);
        expect(result[1]['last_build_id']).toEqual(456);

        result = filter('orderObjectBy')(data.repos, "last_build_id", true);
        expect(result[0]['last_build_id']).toEqual(456);
        expect(result[1]['last_build_id']).toEqual(123);

    });

});