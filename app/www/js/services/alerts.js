var services = angular.module('services.alert', []);

services.factory('AlertService', function ($window) {

    return {
        raiseAlert : function (msg) {

            if (!$window.navigator.notification) {
                // If in browser, display NORMAL alert
                $window.alert(msg);
            } else {
                // If in device, display NATIVE alert
                $window.navigator.notification.alert(
                    msg,
                    false,
                    'Trevor Says',
                    'Okay'
                );

            }

        }
    };


});