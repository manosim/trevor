var app = angular.module('controller.welcome', ['ionic']);

app.controller('WelcomeCtrl', function($scope, $state, $window, $http, AccountsService) {

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
        var authWindow = $window.open(authUrl, '_blank', 'location=no,toolbar=yes,toolbarposition=top,clearcache=yes');

        authWindow.addEventListener('loadstart', function(e) {
            var url = (typeof e.url !== 'undefined' ? e.url : e.originalEvent.url),
                raw_code = /code=([^&]*)/.exec(e.url) || null,
                code = (raw_code && raw_code.length > 1) ? raw_code[1] : null,
                error = /\?error=(.+)$/.exec(e.url);

            if (code || error) {
                //Always close the browser when match is found
                console.log(code);
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
                console.log(data.split("&")[0].split("=")[1]);
                console.log(data.access_token);
                $window.localStorage.githubtoken = data.split("&")[0].split("=")[1];
                console.log($window.localStorage.githubtoken);
                authTravis();
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert("Failure.");
                console.log(data);
            });
    }

    function authTravis() {
        var token = $window.localStorage.githubtoken;

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
            console.log("Success!");
            $window.localStorage.travistoken = data.access_token;
            $state.go('app.accounts');
          }).error(function (data, status, headers, config) {
            alert("Failure." + data);
            console.log(data);
          });
    }


});