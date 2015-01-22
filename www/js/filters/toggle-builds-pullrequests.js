angular.module('filter.toggleBuildsPullRequests', [])

.filter('with', function() {

    return function(items, field, showOnly) {

        var result = [];
        angular.forEach(items, function(value, key) {
            if (showOnly) {
                if (value[field] === true) {
                    result.push(value);
                }
            } else if (!showOnly) {
                if (value[field] === false) {
                    result.push(value);
                }
            }
        });

        return result;
    };
});