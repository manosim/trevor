angular.module('controller.sidemenu', [])

.controller('SidemenuCtrl', function($rootScope, $scope, $stateParams, AccountsService) {

    $rootScope.$on('accountsSet', function (event) {
        $scope.accounts = AccountsService.getAccounts();
        // $scope.pro = AccountsService.getPro();
    });

});