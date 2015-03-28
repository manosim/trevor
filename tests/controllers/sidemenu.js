describe("Testing the SidemenuCtrl.", function () {

    var scope, createController, accountsService;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector, AccountsService) {

            scope = $injector.get('$rootScope');
            controller = $injector.get('$controller');
            accountsService = AccountsService;

            createController = function() {
                return controller('SidemenuCtrl', {
                    '$scope' : $injector.get('$rootScope'),
                    'AccountsService' : accountsService,
                });
            };
        });

    });

    it("Should load the SidemenuCtrl.", function () {

        accountsService.setPro(true);

        spyOn(scope, '$broadcast').and.callThrough()

        var controller = createController();

        scope.$broadcast("accountsSet", true);
        expect(scope.pro).toBeTruthy();

    });

});