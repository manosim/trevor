/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the SearchCtrl.", function () {

    var scope, createController;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector, AlertService, FavouritesService) {

            scope = $injector.get('$rootScope');
            controller = $injector.get('$controller');

            createController = function() {
                return controller('SearchCtrl', {
                    '$scope' : scope,
                });
            };
        });
    });

    it("Should simply load the controller.", function () {

        var controller = createController();

        scope.doSearch();

    });


});