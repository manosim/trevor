/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the MemoryService.", function () {

    var scope, windowMock, memoryService;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector, MemoryService) {

            scope = $injector.get('$rootScope');
            memoryService = MemoryService;

        });

    });

    it("Should get and set the repo name.", function () {

        memoryService.setRepoName("DoeRepo");
        expect(memoryService.repoName).toBe("DoeRepo");

        repoName = memoryService.setRepoName(false);
        expect(repoName).toBeFalsy();

    });

});