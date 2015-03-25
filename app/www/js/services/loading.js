var factories = angular.module('services.loading', []);

factories.factory('LoadingService', function($ionicLoading) {

    return {
        show : function() {
           $ionicLoading.show({
              template: '<div class="loading-text">working on it</div><ul class="loader"><li></li><li></li><li></li></ul>',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
            });
        },
        hide : function(){
            $ionicLoading.hide();
        }
    };
});