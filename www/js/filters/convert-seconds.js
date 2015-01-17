angular.module('filter.convertSeconds', [])

.filter('convertSeconds', function () {
    return function (value) {
        var minutes = Math.floor(value / 60);
        var seconds = value % 60;
        if (minutes > 0) {
            return minutes + 'min ' + seconds + 'sec';
        }
        return seconds + ' sec';
    };
});
