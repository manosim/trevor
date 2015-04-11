/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the AccountsService.", function () {

    var scope, windowMock, accountsService, favouritesService;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector, AccountsService, FavouritesService) {

            scope = $injector.get('$rootScope');
            windowMock = $injector.get('$window');
            accountsService = AccountsService;
            favouritesService = FavouritesService;

        });

    });

    it("Should get the accounts from the service.", function () {

        var data = {
            os: {username: "manos"},
            pro: {username: "johndoe"}
        };

        windowMock.localStorage.travisostoken = "123123123";
        windowMock.localStorage.travisprotoken = "456456456";

        accountsService.setTokens();

        expect(accountsService.isLoggedIn().os).toBeTruthy();
        expect(accountsService.isLoggedIn().pro).toBeTruthy();

        accountsService.setAccounts(data.os, false);
        accountsService.setAccounts(data.pro, true);

        expect(accountsService.accounts.os).toBe(data.os);
        expect(accountsService.accounts.pro).toBe(data.pro);

        var accounts = accountsService.getAccounts();
        expect(accounts.os).toBe(data.os);
        expect(accounts.pro).toBe(data.pro);

    });

    it("Should logout a user.", function () {

        spyOn(favouritesService, 'removeAll');

        windowMock.localStorage.travisostoken = "123123123";
        windowMock.localStorage.travisprotoken = "456456456";

        accountsService.setTokens();

        expect(accountsService.isLoggedIn().os).toBeTruthy();
        expect(accountsService.isLoggedIn().pro).toBeTruthy();

        accountsService.logOut();

        expect(accountsService.isLoggedIn().os).toBeFalsy();
        expect(accountsService.isLoggedIn().pro).toBeFalsy();
        expect(accountsService.tokens.os).toBeFalsy();
        expect(accountsService.tokens.pro).toBeFalsy();

        expect(favouritesService.removeAll).toHaveBeenCalled();
    });

});