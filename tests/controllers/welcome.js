/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the WelcomeCtrl.", function () {

    var scope, state, createController, window, httpBackend, loadingService, accountsService, alertService;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector, LoadingService, AccountsService, AlertService) {

            scope = $injector.get('$rootScope');
            state = $injector.get('$state');
            controller = $injector.get('$controller');
            window = $injector.get('$window');
            httpBackend = $injector.get('$httpBackend');
            loadingService = LoadingService;
            accountsService = AccountsService;
            alertService = AlertService;

            createController = function() {
                return controller('WelcomeCtrl', {
                    '$scope' : $injector.get('$rootScope'),
                    '$state' : $injector.get('$state'),
                    '$window' : window,
                    'LoadingService' : loadingService,
                    'AccountsService' : accountsService,
                    'AlertService' : alertService,
                });
            };
        });

    });


    it("Should try to login the user.", function () {

        // in your test add a mock for window (remember to reset back to normal window after)
        window.open = function(url, target, settings){
            return {
                addEventListener: function(event, callback){
                    if (event == 'loadstart'){
                        callback({
                            url: 'http://www.github.com/?code=123123123',
                            originalEvent:{},

                        });
                    } else if (event == 'exit') {
                        callback();
                    }
                },
                close: function(){}
            };
        };

        spyOn(loadingService, 'show');
        spyOn(accountsService, 'setPro');
        spyOn(alertService, 'raiseAlert');
        spyOn(state, 'go');

        expect(scope.pro).toBeFalsy();

        var controller = createController();

        scope.togglePro();
        expect(scope.pro).toBeTruthy();

        // Should login user
        scope.login();
        expect(loadingService.show).toHaveBeenCalled();
        expect(accountsService.setPro).toHaveBeenCalledWith(scope.pro);

        var data = "abc=def&123";
        httpBackend.expectPOST("https://github.com/login/oauth/access_token").respond(data);
        var data_travis = { "access_token": "1234567890" };
        httpBackend.expectPOST("https://api.travis-ci.com/auth/github").respond(data);
        httpBackend.flush();

        expect(state.go).toHaveBeenCalledWith("app.accounts");

        // Request token should fail
        scope.login();
        expect(loadingService.show).toHaveBeenCalled();
        expect(accountsService.setPro).toHaveBeenCalledWith(scope.pro);

        var data = "abc=def&123";
        httpBackend.expectPOST("https://github.com/login/oauth/access_token").respond(400, "ERROR.");
        httpBackend.flush();
        expect(alertService.raiseAlert).toHaveBeenCalledWith("Oops! Something went wrong and we couldn't log you in. Please try again.");


        // Get travis token should fail
        scope.login();
        expect(loadingService.show).toHaveBeenCalled();
        expect(accountsService.setPro).toHaveBeenCalledWith(scope.pro);

        var data = "abc=def&123";
        httpBackend.expectPOST("https://github.com/login/oauth/access_token").respond(data);
        httpBackend.expectPOST("https://api.travis-ci.com/auth/github").respond(400, "ERROR.");
        httpBackend.flush();
        expect(alertService.raiseAlert).toHaveBeenCalledWith("Oops! Something went wrong and we couldn't log you in. Please try again.");

    });

    it("Should try to login the user.", function () {

        // in your test add a mock for window (remember to reset back to normal window after)
        window.open = function(url, target, settings){
            return {
                addEventListener: function(event, callback){
                    if (event == 'loadstart'){
                        callback({
                            url: 'http://www.github.com/?code=123123123',
                            originalEvent:{},

                        });
                    } else if (event == 'exit') {
                        callback();
                    }
                },
                close: function(){}
            };
        };


        // Mock analytics
        window.analytics = {
            trackEvent: function() {

            }
        }

        spyOn(loadingService, 'show');
        spyOn(accountsService, 'setPro');
        spyOn(alertService, 'raiseAlert');
        spyOn(state, 'go');

        expect(scope.pro).toBeFalsy();

        var controller = createController();

        scope.togglePro();
        expect(scope.pro).toBeTruthy();

        // Should login user
        scope.login();
        expect(loadingService.show).toHaveBeenCalled();
        expect(accountsService.setPro).toHaveBeenCalledWith(scope.pro);

        var data = "abc=def&123";
        httpBackend.expectPOST("https://github.com/login/oauth/access_token").respond(data);
        var data_travis = { "access_token": "1234567890" };
        httpBackend.expectPOST("https://api.travis-ci.com/auth/github").respond(data);
        httpBackend.flush();

        expect(state.go).toHaveBeenCalledWith("app.accounts");

        // Request token should fail
        scope.login();
        expect(loadingService.show).toHaveBeenCalled();
        expect(accountsService.setPro).toHaveBeenCalledWith(scope.pro);

        var data = "abc=def&123";
        httpBackend.expectPOST("https://github.com/login/oauth/access_token").respond(400, "ERROR.");
        httpBackend.flush();
        expect(alertService.raiseAlert).toHaveBeenCalledWith("Oops! Something went wrong and we couldn't log you in. Please try again.");


        // Get travis token should fail
        scope.login();
        expect(loadingService.show).toHaveBeenCalled();
        expect(accountsService.setPro).toHaveBeenCalledWith(scope.pro);

        var data = "abc=def&123";
        httpBackend.expectPOST("https://github.com/login/oauth/access_token").respond(data);
        httpBackend.expectPOST("https://api.travis-ci.com/auth/github").respond(400, "ERROR.");
        httpBackend.flush();
        expect(alertService.raiseAlert).toHaveBeenCalledWith("Oops! Something went wrong and we couldn't log you in. Please try again.");

        window.analytics = undefined;

    });

    it("Should get an error from github.", function () {

        // in your test add a mock for window (remember to reset back to normal window after)
        window.open = function(url, target, settings){
            return {
                addEventListener: function(event, callback){
                    if (event == 'loadstart'){
                        callback({
                            url: 'http://www.github.com/?error=Ooops',
                            originalEvent:{},

                        });
                    } else if (event == 'exit') {
                        callback();
                    }
                },
                close: function(){}
            };
        };

        spyOn(alertService, 'raiseAlert');
        spyOn(accountsService, 'setPro');

        expect(scope.pro).toBeFalsy();

        var controller = createController();

        scope.login();

        expect(alertService.raiseAlert).toHaveBeenCalledWith("Oops! Something went wrong and we couldn't log you in using Github. Please try again.");

    });
});