angular.module('controller.about', [])

.controller('AboutCtrl', function($scope, $stateParams, $window) {

    $scope.goTo = function (url) {
        $window.open(url, '_system');
    } ;

});