// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('travis-mobile', [
    'ionic',
    'controllers',
    'services',
    'filters'
])

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.backButton.text('').icon('ion-ios7-arrow-left').previousTitleText(false);
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

    // Initialize Google Analytics
    if (typeof analytics !== 'undefined'){
        analytics.startTrackerWithId('UA-6891078-46');
        analytics.trackView('Launched App');
    } else {
        console.log("Google Analytics - Unavailable");
    }

    RequestService.token = $window.localStorage.travistoken || false;
    AccountsService.setPro(JSON.parse($window.localStorage.travispro));

    if (AccountsService.isLoggedIn()) {
        FavouritesService.loadFavourites();
        $state.go('app.accounts');
        console.log("Travis Token: " + $window.localStorage.travistoken);
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

    .state('welcome', {
        url: "/welcome",
        templateUrl: 'templates/welcome.html',
        controller: 'WelcomeCtrl'
    })

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'SidemenuCtrl'
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

    .state('app.logout', {
        url: "/logout",
        views: {
            'menuContent': {
                controller: 'LogoutCtrl'
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
        url: "/repos/:loginid",
        views: {
            'menuContent': {
                templateUrl: "templates/repos.html",
                controller: 'ReposCtrl'
            }
        }
    })

    .state('app.builds', {
        url: "/builds/:repoid",
        views: {
            'menuContent': {
                templateUrl: "templates/builds.html",
                controller: 'BuildsCtrl'
            }
        }
    })

    .state('app.build', {
        url: "/build/:buildid",
        views: {
            'menuContent': {
                templateUrl: "templates/build.html",
                controller: 'BuildCtrl'
            }
        }
    })

    .state('app.log', {
        url: "/log/:logid",
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
  $urlRouterProvider.otherwise('/welcome');

});
