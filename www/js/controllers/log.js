angular.module('controller.log', [])

.controller('LogCtrl', function(
    $ionicScrollDelegate, $scope, $stateParams, LoadingService, RequestService, AlertService, $sce
) {

  var jobId = $stateParams.jobid;
  var isPro = $scope.isPro = $stateParams.ispro;

  $scope.log = false;
  $scope.logArchived = false;
  $scope.showRefresh = true;

  $scope.fetch = function() {

    LoadingService.show();

    RequestService
        .requestLog('/jobs/' + jobId + '/log?cors_hax=true', isPro)

        .then(function(payload) {

          console.log('Success-Log with jobId?');

          var data = payload.data;
          var status = payload.status;

          if (status == 200) {
            angular.forEach(data.log.parts, function(value, key) {
              value.content = $sce.trustAsHtml(ansi_up.ansi_to_html(value.content, {use_classes: true}));

              if (value.final === true) {
                $scope.showRefresh = false;
              }
            });

            $scope.log = data.log;
            $ionicScrollDelegate.scrollBottom(true);
            LoadingService.hide();
          } else if (status == 204) {
            $scope.showRefresh = false;
            var location = payload.location;
            RequestService
              .requestLogTxt(location)
              .then(function(data) {
                $scope.logArchived = $sce.trustAsHtml(ansi_up.ansi_to_html(data, {use_classes: true}));
                LoadingService.hide();
                $ionicScrollDelegate.scrollBottom();
              }, function(data, status, headers, config) {
                // Failure
                AlertService.raiseAlert('Oops! We couldn\'t get this log from Travis CI. Please try again.');
                LoadingService.hide();
              });
          }

        }, function(data, status, headers, config) {
          // Failure
          AlertService.raiseAlert('Oops! We couldn\'t get this log from Travis CI. Please try again.');
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
