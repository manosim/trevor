/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the AccountsCtrl.", function () {

    var scope, createController, httpBackend, loadingService, alertService, requestService, accountsService, favouritesService, windowMock;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector, LoadingService, AlertService, AccountsService, RequestService, FavouritesService) {

            scope = $injector.get('$rootScope');
            controller = $injector.get('$controller');
            httpBackend = $injector.get('$httpBackend');
            alertService = AlertService;
            loadingService = LoadingService;
            accountsService = AccountsService;
            requestService = RequestService;
            favouritesService = FavouritesService;
            windowMock = $injector.get('$window');

            createController = function() {
                return controller('AccountsCtrl', {
                    '$scope' : $injector.get('$rootScope'),
                    'LoadingService' : loadingService,
                    'AlertService' : alertService,
                    'AccountsService' : accountsService,
                    'RequestService': requestService,
                    'FavouritesService': favouritesService,
                    '$window' : windowMock,
                });
            };

        });

    });

    it("Should logout a logged in user.", function () {

        spyOn(accountsService, 'logOut');

        var controller = createController();

        scope.logOut();

        expect(accountsService.logOut).toHaveBeenCalled();

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

        spyOn(accountsService, "isLoggedIn").and.returnValue({
            os: true,
            pro: false
        });

        accountsService.tokens.os = "123123123";

        spyOn(loadingService, 'show');
        spyOn(loadingService, 'hide');

        httpBackend.expectGET("https://api.travis-ci.org/accounts?all=true").respond(data);

        var controller = createController();

        expect(loadingService.show).toHaveBeenCalled();

        httpBackend.flush();

        expect(scope.accounts.os[0].type).toBe("user");
        expect(scope.accounts.os[1].name).toBe("DabApps");
        expect(scope.accounts.os[1].repos_count).toEqual(13);
        expect(loadingService.hide).toHaveBeenCalled();
        expect(scope.greeting).toBe("John Doe");
    });

    it("Should get the accounts for Travis CI PRO.", function () {

        var data = {
            "accounts": [
                {
                    "id": 24446,
                    "name": "",
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

        spyOn(accountsService, "isLoggedIn").and.returnValue({
            os: false,
            pro: true
        });

        accountsService.tokens.pro = "123123123";

        httpBackend.expectGET("https://api.travis-ci.com/accounts?all=true").respond(data);

        var controller = createController();

        httpBackend.flush();

        expect(scope.greeting).toBe("johndoe");
    });


    it("Should FAIL to get the accounts from Travis CI PRO.", function () {

        spyOn(alertService, 'raiseAlert');
        spyOn(loadingService, 'hide');

        spyOn(accountsService, "isLoggedIn").and.returnValue({
            os: false,
            pro: true
        });

        accountsService.tokens.pro = "123123123";

        httpBackend.expectGET("https://api.travis-ci.com/accounts?all=true").respond(400, "ERROR.");

        var controller = createController();

        httpBackend.flush();

        expect(alertService.raiseAlert).toHaveBeenCalledWith("Oops! We couldn't get your accounts from Travis CI. Please try again.");
        expect(loadingService.hide).toHaveBeenCalled();
    });


    it("Should DISABLE if pro and NOT subscribed and NOT education.", function () {

        var controller = createController();

        var disable = scope.shouldDisable(false, false);
        expect(disable).toBeTruthy();

    });

    it("Should not disable if pro and subscribed.", function () {

        var controller = createController();

        var disable = scope.shouldDisable(true, false);
        expect(disable).toBeFalsy();
    });

});
