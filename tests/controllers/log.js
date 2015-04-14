/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the LogCtrl.", function () {

    var scope, state, createController, httpBackend, alertService;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector, AlertService) {

            scope = $injector.get('$rootScope');
            state = $injector.get('$state');
            sce = $injector.get('$sce');
            controller = $injector.get('$controller');
            httpBackend = $injector.get('$httpBackend');
            alertService = AlertService;

            stateparams = {
                logid: "123456",
                ispro: false
            };

            createController = function() {
                return controller('LogCtrl', {
                    '$scope' : scope,
                    '$stateParams' : stateparams,
                    'AlertService': alertService,
                });
            };
        });
    });

    it("Should get the log of a build", function () {

        var logId = stateparams.logid;
        var isPro = stateparams.ispro;

        var data = "Hello! Your build exited with 0.";

        httpBackend.expectGET("https://api.travis-ci.org/logs/" + logId).respond(data);

        var controller = createController();

        httpBackend.flush();

        scope.toTop();
        scope.toBottom();

        expect(sce.getTrustedHtml(scope.log)).toBe("Hello! Your build exited with 0.");
    });

    it("Should FAIL to get the log of a build", function () {

        var logId = stateparams.logid;

        spyOn(alertService, 'raiseAlert');

        httpBackend.expectGET("https://api.travis-ci.org/logs/" + logId).respond(400, "ERROR.");

        var controller = createController();

        httpBackend.flush();

        expect(alertService.raiseAlert).toHaveBeenCalledWith("Oops! We couldn't get this log from Travis CI. Please try again.");
    });

});