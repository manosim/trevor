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
                jobid: "123456",
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

    it("Should get the log of a build (not AWS)", function () {

        var jobId = stateparams.jobid;
        var isPro = stateparams.ispro;

        var data = {
            "log": {
                "id":40600989,
                "job_id":58803444,
                "type":"Log",
                "parts": [
                    {
                        "id":7382907890,
                        "number": 1,
                        "content": "Using worker: worker-linux-027f0490-2.bb.travis-ci.org:travis-linux-11\n\n",
                        "final": false
                    },
                    {
                        "id":7382908544,
                        "number": 2,
                        "content": "travis_fold:start:system_info2% (6/260)   \u001B[K\rremote: Compressing objects:   3% (8/260)   \u001B[K\rremote: Compressing objects:\r\n",
                        "final":true
                    }
                ]
            }
        };

        httpBackend.expectGET("https://api.travis-ci.org/jobs/" + jobId + "/log?cors_hax=true").respond(200, data);

        var controller = createController();

        httpBackend.flush();

        scope.toTop();
        scope.toBottom();

        expect(sce.getTrustedHtml(scope.log.parts[0].content)).toContain("Using worker");
        expect(sce.getTrustedHtml(scope.log.parts[1].content)).toContain("travis_fold:start:system");
        expect(scope.logArchived).toBeFalsy();
        expect(scope.showRefresh).toBeFalsy();
    });


    it("Should get the log of a build from AWS", function () {

        var jobId = stateparams.jobid;
        var isPro = stateparams.ispro;

        var payload = {
            location: "http://www.aws.com/"
        };

        var data = "Using worker: worker-linux-027f0490-2.bb.travis-ci.org:travis-linux-11\n\n travis_fold:start:system_info2% (6/260)   \u001B[K\rremote: Compressing objects:   3% (8/260)   \u001B[K\rremote: Compressing objects:\r\n";

        httpBackend.expectGET("https://api.travis-ci.org/jobs/" + jobId + "/log?cors_hax=true").respond(204, {}, {"location":"http://www.aws.com/thelog.txt"});

        httpBackend.expectGET("http://www.aws.com/thelog.txt").respond(data);

        var controller = createController();

        httpBackend.flush();

        scope.toTop();
        scope.toBottom();

        expect(scope.log).toBeFalsy();
        expect(scope.showRefresh).toBeFalsy();
        expect(sce.getTrustedHtml(scope.logArchived)).toContain("Using worker: worker-linux")
    });

    it("Should FAIL to get the log of a build", function () {

        var jobId = stateparams.jobid;

        spyOn(alertService, 'raiseAlert');

        httpBackend.expectGET("https://api.travis-ci.org/jobs/" + jobId + "/log?cors_hax=true").respond(400, "ERROR.");

        var controller = createController();

        httpBackend.flush();

        expect(alertService.raiseAlert).toHaveBeenCalledWith("Oops! We couldn't get this log from Travis CI. Please try again.");
    });

    it("Should get the log of a build from AWS", function () {

        spyOn(alertService, 'raiseAlert');

        var jobId = stateparams.jobid;
        var isPro = stateparams.ispro;

        var payload = {
            location: "http://www.aws.com/"
        };

        var data = "Using worker: worker-linux-027f0490-2.bb.travis-ci.org:travis-linux-11\n\n travis_fold:start:system_info2% (6/260)   \u001B[K\rremote: Compressing objects:   3% (8/260)   \u001B[K\rremote: Compressing objects:\r\n";

        httpBackend.expectGET("https://api.travis-ci.org/jobs/" + jobId + "/log?cors_hax=true").respond(204, {}, {"location":"http://www.aws.com/thelog.txt"});

        httpBackend.expectGET("http://www.aws.com/thelog.txt").respond(400, "ERROR.");

        var controller = createController();

        httpBackend.flush();

        expect(scope.log).toBeFalsy();
        expect(scope.logArchived).toBeFalsy();
        expect(scope.showRefresh).toBeFalsy();

        expect(alertService.raiseAlert).toHaveBeenCalledWith("Oops! We couldn't get this log from Travis CI. Please try again.");
    });

});