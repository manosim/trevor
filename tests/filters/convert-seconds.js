/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the filter convert-seconds.", function () {

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

        result = filter('convertSeconds')(12);
        expect(result).toBe("12 sec");

        result = filter('convertSeconds')(2);
        expect(result).toBe("2 sec");

        result = filter('convertSeconds')(102);
        expect(result).toBe("1min 42sec");

    });

});