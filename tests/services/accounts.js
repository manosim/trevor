/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the AccountsService.", function () {

    var scope, windowMock, accountsService;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector, AccountsService) {

            scope = $injector.get('$rootScope');
            windowMock = $injector.get('$window');
            accountsService = AccountsService;

        });

    });

    it("Should get the accounts from the service.", function () {

        var data = {
            os: {username: "manos"},
            pro: {username: "johndoe"}
        };

        windowMock.localStorage.travisostoken = "123123123";
        windowMock.localStorage.travisprotoken = "456456456";

        var isLoggedIn = accountsService.isLoggedIn();
        expect(isLoggedIn.os).toBeTruthy();
        expect(isLoggedIn.pro).toBeTruthy();

        accountsService.setAccounts(data.os, false);
        accountsService.setAccounts(data.pro, true);

        expect(accountsService.accounts.os).toBe(data.os);
        expect(accountsService.accounts.pro).toBe(data.pro);

        var accounts = accountsService.getAccounts();
        expect(accounts.os).toBe(data.os);
        expect(accounts.pro).toBe(data.pro);

    });

});