angular.module('controller.search', [])

.controller('SearchCtrl', function($scope, LoadingService, RequestService, AlertService) {

    $scope.doSearch = function(slug, author) {
        LoadingService.show();

        var searchUrl = "/repos?orderBy=name&active=true";

        if (slug) {
            searchUrl = searchUrl + "&search=" + slug;
        }

        if (author) {
            searchUrl = searchUrl + "&owner_name=" + author;
        }

        RequestService
            .request("GET", searchUrl, false, false)

            .then(function(data) {

                console.log("Success-Search!");
                $scope.results = [];
                angular.forEach(data.repos, function(value, key) {
                    value.login_id = value.slug.split("/")[0];
                    value.short_slug = value.slug.split("/")[1];
                    $scope.results.push(value);
                });

                LoadingService.hide();

            }, function(data) {

                // Failure
                AlertService.raiseAlert("Oops! We couldn't get the search results from Travis CI. Please try again.");
                LoadingService.hide();

            });

    };

});