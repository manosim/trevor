/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the AccountsCtrl.", function () {

    var scope, createController, httpBackend, loadingService, accountsService;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector, LoadingService, AccountsService) {

            scope = $injector.get('$rootScope');
            controller = $injector.get('$controller');
            httpBackend = $injector.get('$httpBackend');
            loadingService = LoadingService;
            accountsService = AccountsService;

            createController = function() {
                return controller('AccountsCtrl', {
                    '$scope' : $injector.get('$rootScope'),
                    'LoadingService' : loadingService,
                    'AccountsService' : accountsService,
                });
            };

        });

    });

    it("Should get the accounts for Travis CI Open Source.", function () {

        data = {
            "accounts": [
                {
                    "id": 82677,
                    "name": "John Doe",
                    "login": "johndoe",
                    "type": "user",
                    "repos_count": 19,
                    "avatar_url": null
                },
                {
                    "id": 2195,
                    "name": "DabApps",
                    "login": "dabapps",
                    "type": "organization",
                    "repos_count": 13,
                    "avatar_url": "https://avatars.githubusercontent.com/u/445568"
                }
            ]
        };

        accountsService.setPro(false);

        spyOn(loadingService, 'show');
        spyOn(loadingService, 'hide');

        httpBackend.expectGET("https://api.travis-ci.org/accounts?all=true").respond(data);

        var controller = createController();

        expect(loadingService.show).toHaveBeenCalled();

        httpBackend.flush();

        expect(scope.accounts[0].type).toBe("user");
        expect(scope.accounts[1].name).toBe("DabApps");
        expect(scope.accounts[1].repos_count).toEqual(13);
        expect(accountsService.getPro()).toBeFalsy();
        expect(loadingService.hide).toHaveBeenCalled();
        expect(scope.greeting).toBe("John Doe");
    });

    it("Should get the accounts for Travis CI PRO.", function () {

        var data = {
            "accounts": [
                {
                    "id": 24446,
                    "name": "John Doe",
                    "login": "johndoe",
                    "type": "user",
                    "repos_count": 6,
                    "subscribed": false,
                    "education": true
                },
                {
                    "id": 34,
                    "name": "Travis CI GmbH",
                    "login": "travis-pro",
                    "type": "organization",
                    "repos_count": 90,
                    "subscribed": true,
                    "education": false
                }
            ]
        };

        accountsService.setPro(true);

        httpBackend.expectGET("https://api.travis-ci.com/accounts?all=true").respond(data);

        var controller = createController();

        httpBackend.flush();

        expect(accountsService.getPro()).toBeTruthy();
        expect(scope.greeting).toBe("John Doe");
    });


    it("Should logout a logged in user.", function () {

        accountsService.setPro(true);

        var controller = createController();

        scope.logOut();

        expect(accountsService.isLoggedIn()).toBeFalsy();
    });


    it("Should DISABLE if pro and NOT subscribed and NOT education.", function () {

        accountsService.setPro(true);

        var controller = createController();

        var disable = scope.shouldDisable(false, false);
        expect(disable).toBeTruthy();
    });


    it("Should not disable if pro and subscribed.", function () {

        accountsService.setPro(true);

        var controller = createController();

        var disable = scope.shouldDisable(true, false);
        expect(disable).toBeFalsy();
    });


});


describe("Testing the LogoutCtrl.", function () {

    var scope, state, createController, accountsService;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector, LoadingService, AccountsService) {

            scope = $injector.get('$rootScope');
            controller = $injector.get('$controller');
            state = $injector.get('$state');
            accountsService = AccountsService;

            createController = function() {
                return controller('LogoutCtrl', {
                    '$scope' : $injector.get('$rootScope'),
                    '$state' : $injector.get('$state'),
                    'AccountsService' : accountsService,
                });
            };

        });

    });


    it("Should logout a logged in user.", function () {

        spyOn(accountsService, 'logOut');
        spyOn(state, 'go');

        var controller = createController();

        expect(accountsService.logOut).toHaveBeenCalled();
        expect(state.go).toHaveBeenCalledWith("welcome");

    });

});