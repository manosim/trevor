/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the WelcomeCtrl.", function () {

    var scope, createController, window;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector) {

            scope = $injector.get('$rootScope');
            controller = $injector.get('$controller');
            window = $injector.get('$window');

            createController = function() {
                return controller('AboutCtrl', {
                    '$scope' : $injector.get('$rootScope'),
                    '$window' : window,
                });
            };
        });

    });

    it("Should go to the welcome screen.", function () {

        spyOn(window, 'open');

        var controller = createController();

        scope.goTo("http://www.iamemmanouil.com/")

        expect(window.open).toHaveBeenCalledWith("http://www.iamemmanouil.com/", "_system");

    });

});