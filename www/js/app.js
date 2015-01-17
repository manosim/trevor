// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('travis-mobile', [
    'ionic',
    'controllers',
])

.run(function($ionicPlatform, $window) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    console.log("Github Token: " + $window.localStorage.githubtoken);
    console.log("Travis Token: " + $window.localStorage.travistoken);

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
    })

    .state('app.home', {
        url: "/home",
        views: {
            'menuContent': {
                templateUrl: "templates/home.html",
                controller: 'HomeCtrl'
            }
        }
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

    .state('app.repos', {
        url: "/repos",
        views: {
            'menuContent': {
                templateUrl: "templates/repos.html",
                controller: 'ReposCtrl'
            }
        }
    })

    .state('app.builds', {
        url: "/builds",
        views: {
            'menuContent': {
                templateUrl: "templates/builds.html",
                controller: 'BuildsCtrl'
            }
        }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

});
