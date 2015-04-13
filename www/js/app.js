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

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-left').previousTitleText(false);
})

.run(function($ionicPlatform, $rootScope, AccountsService, RequestService, FavouritesService, $state, $window) {

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

    // RequestService.token = $window.localStorage.travistoken || false;
    AccountsService.setTokens();

    if (AccountsService.isLoggedIn()) {
        FavouritesService.loadFavourites();
        $state.go('app.accounts');

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
    }

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        // Log the View Name if it changes
        if (typeof analytics !== 'undefined'){
            analytics.trackView(toState.name);
        }
    });

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
    })

    .state('app.accounts', {
        url: "/accounts",
        views: {
            'menuContent': {
                templateUrl: "templates/accounts.html",
                controller: 'AccountsCtrl'
            }
        }
    })

    .state('app.favourites', {
        url: "/favourites",
        views: {
            'menuContent': {
                templateUrl: "templates/favourites.html",
                controller: 'FavouritesCtrl'
            }
        }
    })

    .state('app.repos', {
        url: "/repos/:loginid?ispro",
        views: {
            'menuContent': {
                templateUrl: "templates/repos.html",
                controller: 'ReposCtrl'
            }
        }
    })

    .state('app.builds', {
        url: "/builds/:loginid/:repo?ispro",
        views: {
            'menuContent': {
                templateUrl: "templates/builds.html",
                controller: 'BuildsCtrl'
            }
        }
    })

    .state('app.build', {
        url: "/build/:buildid?ispro",
        views: {
            'menuContent': {
                templateUrl: "templates/build.html",
                controller: 'BuildCtrl'
            }
        }
    })

    .state('app.log', {
        url: "/log/:logid?ispro",
        views: {
            'menuContent': {
                templateUrl: "templates/log.html",
                controller: 'LogCtrl'
            }
        }
    })

    .state('app.about', {
        url: "/about",
        views: {
            'menuContent': {
                templateUrl: "templates/about.html",
                controller: 'AboutCtrl'
            }
        }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/accounts');

});
