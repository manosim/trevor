// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('trevor', [
    'ionic',
    'controllers',
    'services',
    'filters'
])

.run(function($ionicPlatform, $rootScope, FavouritesService) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
    }

    if (window.cordova) {
        setTimeout(function() {
            window.navigator.splashscreen.hide();
        }, 600);
    }

    // Initialize Google Analytics
    if (typeof analytics !== 'undefined'){
        analytics.startTrackerWithId('UA-59790043-2');
        analytics.trackView('Launched App');
    } else {
        console.log("Google Analytics - Unavailable");
    }

    // Rate my app init and settings
    if (window.AppRate) {
        var customLocale = {};
        customLocale.title = "Rate Trevor";
        customLocale.message = "Your feedback is important for Trevor! Would you mind taking a moment to rate it? Thank you for downloading Trevor!";
        customLocale.cancelButtonLabel = "No, Thanks";
        customLocale.laterButtonLabel = "Remind Me Later";
        customLocale.rateButtonLabel = "Rate It Now";

        AppRate.preferences.storeAppURL.ios = '962155187';
        AppRate.preferences.storeAppURL.android = 'market://details?id=com.iamemmanouil.trevor';
        AppRate.preferences.usesUntilPrompt = 3;
        AppRate.preferences.promptAgainForEachNewVersion = true;
        AppRate.preferences.customLocale = customLocale;
        AppRate.promptForRating();
    }

    FavouritesService.loadFavourites();

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        // Log the View Name if it changes
        if (typeof analytics !== 'undefined'){
            analytics.trackView(toState.name);
        }
    });

  });
})

.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider) {

  $ionicConfigProvider.views.maxCache(0);
  $ionicConfigProvider.backButton.icon("ion-ios-arrow-left");
  $ionicConfigProvider.backButton.text("");
  $ionicConfigProvider.backButton.previousTitleText(false);

  $stateProvider

    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

    .state('tab.accounts', {
        url: "/accounts",
        views: {
            'tab-accounts': {
                templateUrl: "templates/tabs/accounts.html",
                controller: 'AccountsCtrl'
            }
        }
    })

    .state('tab.favourites', {
        url: "/favourites",
        views: {
            'tab-favourites': {
                templateUrl: "templates/tabs/favourites.html",
                controller: 'FavouritesCtrl'
            }
        }
    })

    .state('tab.search', {
        url: "/search",
        views: {
            'tab-search': {
                templateUrl: "templates/tabs/search.html",
                controller: 'SearchCtrl'
            }
        }
    })

    .state('tab.repos', {
        url: "/repos/:loginid?ispro",
        views: {
            'tab-accounts': {
                templateUrl: "templates/repos.html",
                controller: 'ReposCtrl'
            }
        }
    })

    .state('tab.builds', {
        url: "/builds/:loginid/:repo?ispro",
        views: {
            'tab-accounts': {
                templateUrl: "templates/builds.html",
                controller: 'BuildsCtrl'
            }
        }
    })

    .state('tab.build', {
        url: "/build/:buildid?ispro",
        views: {
            'tab-accounts': {
                templateUrl: "templates/build.html",
                controller: 'BuildCtrl'
            }
        }
    })

    .state('tab.log', {
        url: "/log/:logid?ispro",
        views: {
            'tab-accounts': {
                templateUrl: "templates/log.html",
                controller: 'LogCtrl'
            }
        }
    })

    .state('tab.about', {
        url: "/about",
        views: {
            'tab-accounts': {
                templateUrl: "templates/about.html",
                controller: 'AboutCtrl'
            }
        }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/accounts');

});
