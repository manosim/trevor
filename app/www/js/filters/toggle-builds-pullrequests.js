angular.module('filter.toggleBuildsPullRequests', [])

.filter('with', function() {

    return function(items, showOnly) {

        var result = [];
        angular.forEach(items, function(value, key) {
            if (showOnly == "builds") {
                if (value.pull_request === false) {
                    result.push(value);
                }
            } else if (showOnly == "pr") {
                if (value.pull_request === true) {
                    result.push(value);
                }
            } else {
                result.push(value);
            }
        });

        return result;
    };
});