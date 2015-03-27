/* global describe, beforeEach, spyOn, expect, it, $, */

describe("Testing the alert service.", function () {

    var scope, windowMock, createController, alertService;

    beforeEach(function(){

        angular.mock.module('trevor');
        angular.mock.module('templates');

        inject(function ($injector, AlertService) {

            scope = $injector.get('$rootScope');
            windowMock = $injector.get('$window');
            alertService = AlertService;

        });

    });

    it("Should raise a NATIVE alert.", function () {

        var alert_msg = "Hello! I'm an alert!";

        windowMock.navigator = {
            notification: {
                alert: function(data){
                    return false;
                }
            }
        };

        spyOn(windowMock.navigator.notification, 'alert').and.callThrough();

        alertService.raiseAlert(alert_msg);

        expect(windowMock.navigator.notification.alert).toHaveBeenCalled();

    });

    it("Should raise a NORMAL alert.", function () {

        var alert_msg = "Hello! I'm an alert!";

        windowMock.navigator = {
            notification: false
        };

        spyOn(windowMock, 'alert').and.callThrough();

        alertService.raiseAlert(alert_msg);

        expect(windowMock.alert).toHaveBeenCalled();
    });

});