/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the BuildCtrl.", function () {

    var scope, createController, httpBackend, loadingService, alertService, accountsService, favouritesService;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector, LoadingService, AlertService, AccountsService, FavouritesService) {

            scope = $injector.get('$rootScope');
            controller = $injector.get('$controller');
            httpBackend = $injector.get('$httpBackend');
            alertService = AlertService;
            loadingService = LoadingService;
            accountsService = AccountsService;
            favouritesService = FavouritesService;

            stateparams = {
                loginid: "ekonstantinidis",
                repo: "demo-project",
                ispro: false
            };

            createController = function() {
                return controller('BuildsCtrl', {
                    '$scope' : $injector.get('$rootScope'),
                    '$stateParams' : stateparams,
                    'LoadingService' : loadingService,
                    'AlertService' : alertService,
                    'AccountsService' : accountsService,
                    'FavouritesService' : favouritesService,
                });
            };

        });

    });

    it("Should get the repos for an account.", function () {

        var loginId = stateparams.loginid;
        var repo = stateparams.repo;
        var isPro = stateparams.ispro;

        data = {
            "builds": [
                {
                    "id": 51802125,
                    "repository_id": 2855496,
                    "commit_id": 14869644,
                    "number": "109",
                    "pull_request": false,
                    "pull_request_title": null,
                    "pull_request_number": null,
                    "config": {
                        "branches": {
                            "only": [
                                "src"
                            ]
                        }
                    },
                    "state": "passed",
                    "started_at": "2015-02-23T08:58:03Z",
                    "finished_at": "2015-02-23T08:58:52Z",
                    "duration": 49,
                    "job_ids": [
                        51802126
                    ]
                }
            ],
            "commits": [
                {
                    "id": 14869644,
                    "sha": "da166ecf2f7eebaf24b15d46a45030a70774f3f3",
                    "branch": "src",
                    "message": "Update Date",
                    "committed_at": "2015-02-23T08:57:04Z",
                    "author_name": "Emmanouil Konstantinidis",
                    "author_email": "manos@iamemmanouil.com",
                    "committer_name": "Emmanouil Konstantinidis",
                    "committer_email": "manos@iamemmanouil.com",
                    "compare_url": "https://github.com/ekonstantinidis/ekonstantinidis.github.io/compare/8dcb7b80a782...da166ecf2f7e",
                    "pull_request_number": null
                }
            ]
        };

        httpBackend.expectGET("https://api.travis-ci.org/repos/" + loginId + "/" + repo + "/builds").respond(data);

        var controller = createController();

        httpBackend.flush();

        expect(scope.builds[0].id).toEqual(51802125);
        expect(scope.builds[0].commit.id).toEqual(14869644);

        scope.toggleFavourite();
        expect(scope.isFavourite).toBe(true);

        scope.toggleFavourite();
        expect(scope.isFavourite).toBe(false);

    });
    it("Should get the repos for an account.", function () {

        var loginId = stateparams.loginid;
        var repo = stateparams.repo;
        var isPro = stateparams.ispro;

        spyOn(alertService, 'raiseAlert');

        httpBackend.expectGET("https://api.travis-ci.org/repos/" + loginId + "/" + repo + "/builds").respond(400, "ERROR.");

        var controller = createController();

        httpBackend.flush();

        expect(alertService.raiseAlert).toHaveBeenCalledWith("Oops! We couldn't get this repo's builds from Travis CI. Please try again.");

    });

});

