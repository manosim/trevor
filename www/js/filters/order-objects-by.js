angular.module('filter.orderObjectBy', [])

.filter('orderObjectBy', function() {
    return function(items, field, reverse) {
        var filtered = [];

        angular.forEach(items, function(item) {
            filtered.push(item);
        });

        filtered.sort(function (a, b) {
            return (a[field] > b[field] ? 1 : -1);
        });

        if(reverse) filtered.reverse();

        return filtered;
    };
})


.filter('with', function() {
    return function(items, field, onlyActive) {
        var result = {};
        angular.forEach(items, function(value, key) {
            if (onlyActive) {
                if (value[field] === true) {
                    result[key] = value;
                }
            } else {
                result[key] = value;
            }
        });
        return result;
    };
});