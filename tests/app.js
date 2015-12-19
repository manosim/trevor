/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the FavouritesService.", function () {

    var scope;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector) {

            scope = $injector.get('$rootScope');

        });

    });

    it("Should add and remove favourites.", function () {

        // Mock cordova and plugins
        window.cordova = {
            plugins: {
                Keyboard: {
                    hideKeyboardAccessoryBar: function (value) {
                        return;
                    }
                }
            }
        };


        window.AppRate = {
            preferences: {
                storeAppURL: {
                    "ios": "",
                    "android": ""
                },
                usesUntilPrompt: "",
                promptAgainForEachNewVersion: false,
                customLocale: ""
            },
            promptForRating: function() {

            }
        };


        window.StatusBar = {
            styleLightContent: function() {
                return;
            }
        };


        window.navigator = {
            splashscreen: {
                hide: function() {

                }
            }
        };


        // Mock analytics
        window.analytics = {
            trackEvent: function() {

            },
            trackView: function(value) {

            },
            startTrackerWithId: function(value) {

            },
        };

        window.cordova = undefined;
    });

});