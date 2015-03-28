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

        var data = [
            {username: "manos"},
            {username: "johndoe"},
        ];

        windowMock.localStorage.travistoken = "123123123";
        windowMock.localStorage.travispro = true;

        // Mock analytics
        windowMock.analytics = {
            trackEvent: function() {

            }
        }

        accountsService.logOut();

        // Re-undefine analytics
        windowMock.analytics = undefined

        windowMock.localStorage.travistoken = "123123123";
        windowMock.localStorage.travispro = true;

        var isLoggedIn = accountsService.isLoggedIn();
        expect(isLoggedIn).toBeTruthy();

        accountsService.setAccounts(data);
        expect(accountsService.accounts).toBe(data);

        var accounts = accountsService.getAccounts();
        expect(accounts).toBe(data);


        // spyOn(window.analytics, 'trackEvent').and.returnValue({})

    });

});