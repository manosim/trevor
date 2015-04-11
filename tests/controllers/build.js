/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the BuildCtrl.", function () {

    var scope, createController, httpBackend, loadingService, alertService, accountsService;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector, LoadingService, AlertService, AccountsService) {

            scope = $injector.get('$rootScope');
            controller = $injector.get('$controller');
            httpBackend = $injector.get('$httpBackend');
            alertService = AlertService;
            loadingService = LoadingService;
            accountsService = AccountsService;

            stateparams = {
                buildid: "123123",
                ispro: false
            };

            createController = function() {
                return controller('BuildCtrl', {
                    '$scope' : $injector.get('$rootScope'),
                    '$stateParams' : stateparams,
                    '$window' : window,
                    'LoadingService' : loadingService,
                    'AlertService' : alertService,
                    'AccountsService' : accountsService,
                });
            };

        });

    });

    it("Should get the repos for an account.", function () {

        var buildId = stateparams.buildid;
        var isPro = stateparams.ispro;

        spyOn(window, 'open');

        data = {
            "build": {
                "id": 45063193,
                "repository_id": 3609153,
                "commit_id": 12964509,
                "number": "54",
                "pull_request": false,
                "pull_request_title": null,
                "pull_request_number": null,
                "config": {
                    "language": "node_js",
                    "node_js": [
                        "0.11"
                    ],
                    "before_install": [
                        "npm install -g grunt-cli"
                    ],
                    "script": [
                        "grunt deploy"
                    ],
                    "branches": {
                        "only": [
                            "master"
                        ]
                    },
                    ".result": "configured",
                    "global_env": [
                        {
                            "secure": "Si2/Fz6Ehzs0URoilU+rbNgMOf2GIJpMPAAL6U9Cv5MCboplUDkC29N/V0tQm6BQrCAE++qWiWiy0WMH8MumOR14ZVsrg0Cq1XGM3Eu3A79LG51vqtFl3a3pGPlIqwihJ553gH/UrQkxVcw0syYU/jkQ6oRIoxAF3muY354/9sk="
                        }
                    ],
                    "os": "linux"
                },
                "state": "passed",
                "started_at": "2014-12-24T23:26:54Z",
                "finished_at": "2014-12-24T23:27:17Z",
                "duration": 23,
                "job_ids": [
                    45063194
                ]
            },
            "commit": {
                "id": 12964509,
                "sha": "d63a43231b340f3347ce7c8a8d78fb5d89d59edb",
                "branch": "master",
                "message": "Update open graph icon",
                "committed_at": "2014-12-24T23:26:20Z",
                "author_name": "Emmanouil Konstantinidis",
                "author_email": "manos@iamemmanouil.com",
                "committer_name": "Emmanouil Konstantinidis",
                "committer_email": "manos@iamemmanouil.com",
                "compare_url": "https://github.com/compare_that/a8ab4c2d63a43231b34"
            },
            "jobs": [
                {
                    "id": 45063194,
                    "repository_id": 3609153,
                    "build_id": 45063193,
                    "commit_id": 12964509,
                    "log_id": 30325536,
                    "state": "passed",
                    "number": "54.1",
                    "config": {
                        "language": "node_js",
                        "node_js": "0.11",
                        "before_install": [
                            "npm install -g grunt-cli"
                        ],
                        "script": [
                            "grunt deploy"
                        ],
                        "branches": {
                            "only": [
                                "master"
                            ]
                        },
                        ".result": "configured",
                        "global_env": "GH_TOKEN=[secure]",
                        "os": "linux"
                    },
                    "started_at": "2014-12-24T23:26:54Z",
                    "finished_at": "2014-12-24T23:27:17Z",
                    "queue": "builds.linux",
                    "allow_failure": false,
                    "tags": null,
                    "annotation_ids": []
                }
            ],
            "annotations": []
        };

        spyOn(accountsService, "isLoggedIn").and.returnValue({
            os: true,
            pro: false
        });

        accountsService.tokens.os = "123123123";

        httpBackend.expectGET("https://api.travis-ci.org/builds/" + buildId).respond(data);

        var controller = createController();

        httpBackend.flush();

        expect(scope.build.id).toEqual(45063193);
        expect(scope.commit.id).toEqual(12964509);
        expect(scope.jobs[0].id).toEqual(45063194);

        scope.openCompare(123, "my-repository");
        expect(window.open).toHaveBeenCalledWith('https://github.com/compare_that/a8ab4c2d63a43231b34', '_system', '');

    });

    it("Should FAILT to get the repos for an account.", function () {

        var buildId = stateparams.buildid;
        spyOn(alertService, 'raiseAlert');

        httpBackend.expectGET("https://api.travis-ci.org/builds/" + buildId).respond(400, "ERROR.");

        var controller = createController();

        httpBackend.flush();

        expect(alertService.raiseAlert).toHaveBeenCalledWith("Oops! We couldn't get this build from Travis CI. Please try again.");

    });

});

