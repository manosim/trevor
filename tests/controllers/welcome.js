/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the WelcomeCtrl.", function () {

    var scope, createController;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector) {

            scope = $injector.get('$rootScope');
            controller = $injector.get('$controller');

            createController = function() {
                return controller('WelcomeCtrl', {
                    '$scope' : $injector.get('$rootScope'),
                });
            };
        });

    });

    it("Should go to the welcome screen.", function () {

        var controller = createController();

        expect(false).toBeTruthy();

    });

});