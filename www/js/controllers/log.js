angular.module('controller.log', [])

.controller('LogCtrl', function($ionicScrollDelegate, $scope, $stateParams, LoadingService, RequestService, AlertService) {

    var logId = $stateParams.logid;
    var isPro = $scope.isPro = $stateParams.ispro;

    $scope.showRefresh = true;

    $scope.fetch = function() {

        LoadingService.show();

        RequestService
            .request("GET", '/logs/' + logId, isPro, false)

            .then(function(data) {

                console.log("Success-Log with Id!");
                $scope.log = data;
                $ionicScrollDelegate.scrollBottom();

                if (data.indexOf("Your build exited with") > -1) {
                    $scope.showRefresh = false;
                }

                LoadingService.hide();

            }, function(data) {
                // Failure
                AlertService.raiseAlert("Oops! We couldn't get this log from Travis CI. Please try again.");
                LoadingService.hide();
            });

    };

    $scope.fetch();

    $scope.toTop = function () {
        $ionicScrollDelegate.scrollTop(true);
    };

    $scope.toBottom = function () {
        $ionicScrollDelegate.scrollBottom(true);
    };

});