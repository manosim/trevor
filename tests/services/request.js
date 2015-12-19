/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the RequestService.", function () {

    var scope, requestService, accountsService, alertService;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector, RequestService, AccountsService, AlertService) {

            scope = $injector.get('$rootScope');
            requestService = RequestService;
            accountsService = AccountsService;
            alertService = AlertService;

        });

    });

    it("Should try to make a request without pro variable set.", function () {

        spyOn(alertService, 'raiseAlert');

        requestService.request("POST", "http://www.api.com/", "asdasdasd", false);

        expect(alertService.raiseAlert).toHaveBeenCalledWith("Oops! Something went wrong and we couldn't make your request. Please try again.");

    });

    it("Should get a log as pro.", function () {

        spyOn(alertService, 'raiseAlert');

        requestService.requestLog("https://api.travis-ci.com/jobs/123/log?cors_hax=true", "true");

    });

    it("Should fail to set pro or os.", function () {

        spyOn(alertService, 'raiseAlert');

        requestService.requestLog("https://api.travis-ci.com/jobs/123/log?cors_hax=true", "hello");

        expect(alertService.raiseAlert).toHaveBeenCalledWith("Oops! Something went wrong and we couldn't make your request. Please try again.");

    });

});