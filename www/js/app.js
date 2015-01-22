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
    $ionicConfigProvider.views.maxCache(0);
})

.run(function($ionicPlatform, AccountsService, RequestService, $state, $window) {

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

    RequestService.token = $window.localStorage.travistoken || false;
    AccountsService.setPro(JSON.parse($window.localStorage.travispro));

    if (AccountsService.isLoggedIn() == "asds") {
        $state.go('app.accounts');
        console.log("Github Token: " + $window.localStorage.githubtoken);
        console.log("Travis Token: " + $window.localStorage.travistoken);
    }

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
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/welcome');

});
