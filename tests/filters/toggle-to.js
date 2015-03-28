/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the filter toggle builds.", function () {

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

        var data = {
            "builds": [
                {
                    "id": 1,
                    "number": "101",
                    "pull_request": false,
                    "pull_request_title": null,
                    "pull_request_number": null,
                    "state": "passed",
                    "started_at": "2015-02-23T08:58:03Z",
                    "finished_at": "2015-02-23T08:58:52Z",
                    "duration": 49,
                },
                {
                    "id": 2,
                    "number": "102",
                    "pull_request": true,
                    "pull_request_title": null,
                    "pull_request_number": null,
                    "state": "passed",
                    "started_at": "2015-02-23T08:58:03Z",
                    "finished_at": "2015-02-23T08:58:52Z",
                    "duration": 49,
                }
            ]
        };

        var result;

        result = filter('toggleTo')(data.builds, "pr");
        expect(result.length).toEqual(1);
        expect(result[0]['id']).toEqual(2);

        result = filter('toggleTo')(data.builds, "builds");
        expect(result.length).toEqual(1);
        expect(result[0]['id']).toEqual(1);

        result = filter('toggleTo')(data.builds);
        expect(result.length).toEqual(2);

    });

});