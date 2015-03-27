/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the filter time-ago.", function () {

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

        var result;

        var baseTime = new Date(2015, 4, 23);
        jasmine.clock().mockDate(baseTime);

        result = filter('timeAgo')("2015-02-23T08:58:03");
        expect(result).toBe("89 days ago");

        result = filter('timeAgo')("2014-04-10T08:58:03");
        expect(result).toBe("408 days ago");

    });

});