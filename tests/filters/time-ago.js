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

        var baseTime = new Date(2015, 4, 23, 18, 00);
        jasmine.clock().mockDate(baseTime);

        result = filter('timeAgo')(baseTime - 50);
        expect(result).toBe(" about a minute ago");

        result = filter('timeAgo')(baseTime - 2000000);
        expect(result).toBe("33 mins ago");

        result = filter('timeAgo')(baseTime - 9000000);
        expect(result).toBe("3 hours ago");

        result = filter('timeAgo')(baseTime - 909000000);
        expect(result).toBe("11 days ago");

        result = filter('timeAgo')(["hello",  "world"]);
        expect(result).toBe(undefined);

        result = filter('timeAgo')();
        expect(result).toBe("Not yet");

        result = filter('timeAgo')("25 March 2015");
        expect(result).toBe("60 days ago");

        spyOn(angular, "isDate").and.callFake(function() {
            return {
                getTime: function() {

                }
            };
        });

        result = filter('timeAgo')(baseTime);
        expect(result).toBe(" about a minute ago");

    });

});