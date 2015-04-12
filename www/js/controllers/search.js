angular.module('controller.search', [])

.controller('SearchCtrl', function($scope, LoadingService, RequestService, AlertService) {

    $scope.doSearch = function() {
        LoadingService.show();
        LoadingService.hide();
    };

});