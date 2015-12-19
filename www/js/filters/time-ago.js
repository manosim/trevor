angular.module('filter.timeAgo', [])

.filter('timeAgo', function () {

  return function (time) {
    if (!time) return 'Not yet';

    var local = Date.now();

    if (angular.isDate(time)) {
      time = time.getTime();
    } else if (typeof time === 'string') {
      time = new Date(time).getTime();
    }

    if (typeof time !== 'number' || typeof local !== 'number') {
      return;
    }

    var
      offset = Math.abs((local - time) / 1000),
      span = [],
      MINUTE = 60,
      HOUR = 3600,
      DAY = 86400;

    if (offset < MINUTE)               span = [ '', 'about a minute' ];
    else if (offset < (MINUTE * 60))   span = [ Math.round(Math.abs(offset / MINUTE)), 'min' ];
    else if (offset < (HOUR * 24))     span = [ Math.round(Math.abs(offset / HOUR)), 'hour' ];
    else                               span = [ Math.round(Math.abs(offset / DAY)), 'day' ];

    span[1] += (span[0] === 0 || span[0] > 1) ? 's' : '';
    span = span.join(' ');

    return (time <= local) ? span + ' ago' : 'in ' + span;
  };

});
