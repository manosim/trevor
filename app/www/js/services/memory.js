var services = angular.module('services.memory', []);

services.factory('MemoryService', function () {

    var service = {

        repoName: false,

        getRepoName: function () {
            return service.repoName;
        },

        setRepoName: function (value) {
            if (value === false) {
                service.repoName = false;
            } else {
                service.repoName = value;
            }
        }

    };

  return service;
});