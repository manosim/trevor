angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $window, $http) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];



        var options = {
            client_id: 'a6adc03baaa25c30292c',
            client_secret: '49c6d6012de3988db2364b49e161f8fe3052e920',
            redirect_uri: 'http://btnlab.uk/callback.html',
            scope: [
                "user:email", "read:org", "repo_deployment",
                "repo:status", "write:repo_hook"
            ]
        };

  $scope.login = function() {


        //Build the OAuth consent page URL
        var githubUrl = 'https://github.com/login/oauth/authorize?';
        var authUrl = githubUrl + 'client_id=' + options.client_id + '&redirect_uri=' + options.redirect_uri + '&scope=' + options.scope;

        var authWindow = $window.open(authUrl, '_blank', 'location=no,toolbar=yes');


        authWindow.addEventListener('loadstart', function(e) {
            var url = (typeof e.url !== 'undefined' ? e.url : e.originalEvent.url),
                raw_code = /code=([^&]*)/.exec(e.url) || null,
                code = (raw_code && raw_code.length > 1) ? raw_code[1] : null,
                error = /\?error=(.+)$/.exec(e.url);

            if (code || error) {
                //Always close the browser when match is found
                console.log(code)
                requestToken(code);
                authWindow.close();
            }

            //now lets validate the token on the server
            if (code) {

                service.getAPIToken(code, deferred);

            } else if (error) {
                //The user denied access to the app
                deferred.reject({
                    error: error[1]
                });
            }
        }, false);

  };




function requestToken(code) {

  $http.post('https://github.com/login/oauth/access_token',{
      client_id: options.client_id,
      client_secret: options.client_secret,
      code: code,
    }).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      alert("Success!");
      console.log(data.split("&")[0].split("=")[1]);
      console.log(data.access_token);


      $window.localStorage.githubtoken = data.split("&")[0].split("=")[1];

      console.log($window.localStorage.githubtoken);

    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      alert("Failure.");
      console.log(data);
    });

  }





$scope.getBuilds = function() {

    var token = $window.localStorage.githubtoken;
    console.log(token);

    $http({
        url: 'https://api.travis-ci.org/auth/github',
        method: "POST",
        data: {github_token: token},
        headers: {
            // 'User-Agent': 'MyClient/1.0.0',
            'Accept': 'application/vnd.travis-ci.2+json',
            // 'Host': 'api.travis-ci.org',
            // 'Content-Type': 'application/json',
            // 'Content-Length': 37
          }
      }).success(function (data, status, headers, config) {
        alert("Success!");
        console.log(data);


        $window.localStorage.travistoken = data.access_token;


      }).error(function (data, status, headers, config) {
        alert("Failure.");
        console.log(data);
      });

};








})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
