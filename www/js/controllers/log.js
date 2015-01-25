angular.module('controller.log', [])

.controller('LogCtrl', function($ionicScrollDelegate, $scope, $stateParams, $window, LoadingService, RequestService, AlertService) {

    var logId = $stateParams.logid;

    LoadingService.show();

    RequestService
        .request("GET", '/logs/' + logId, true)

        .then(function(data) {

            console.log("Success-Log with Id!");
            $scope.log = data;
            $ionicScrollDelegate.scrollBottom();

            LoadingService.hide();

        }, function(data) {

            // Failure
            AlertService.raiseAlert("Oops! We couldn't get this log from Travis CI. Please try again.");
            LoadingService.hide();

        });

    $scope.toTop = function () {
        $ionicScrollDelegate.scrollTop(true);
    };

});