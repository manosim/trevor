/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the WelcomeCtrl.", function () {

    var scope, createController, window, loadingService, accountsService;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector, LoadingService, AccountsService) {

            scope = $injector.get('$rootScope');
            controller = $injector.get('$controller');
            window = $injector.get('$window');
            loadingService = LoadingService;
            accountsService = AccountsService;

            createController = function() {
                return controller('WelcomeCtrl', {
                    '$scope' : $injector.get('$rootScope'),
                    '$window' : window,
                    'LoadingService' : loadingService,
                    'AccountsService' : accountsService,
                });
            };
        });

    });

    it("Should go to the welcome screen.", function () {

        spyOn(loadingService, 'show');
        spyOn(accountsService, 'setPro');

        expect(scope.pro).toBeFalsy();

        var controller = createController();

        scope.togglePro();
        expect(scope.pro).toBeTruthy();

        scope.login();
        expect(loadingService.show).toHaveBeenCalled();

        expect(accountsService.setPro).toHaveBeenCalledWith(scope.pro);

    });

});