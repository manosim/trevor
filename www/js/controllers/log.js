angular.module('controller.log', [])

.controller('LogCtrl', function($ionicScrollDelegate, $scope, $stateParams, $window, LoadingService, RequestService) {

    var logId = $stateParams.logid;

    LoadingService.show();

    $scope.fetch = function() {

        RequestService
            .request("GET", '/logs/' + logId, true)

            .then(function(data) {

                console.log("Success-Log with Id!");
                $scope.log = data;
                $ionicScrollDelegate.scrollBottom();

                LoadingService.hide();

            }, function(data) {

                // Failure
                alert("Failure-Log.");
                console.log(data);
                LoadingService.hide();

            })
            .finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });

    };

    $scope.fetch();

    $scope.toTop = function () {
        $ionicScrollDelegate.scrollTop(true);
    };

});