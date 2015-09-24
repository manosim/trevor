'use strict';

var React = require('react-native');
var _ = require('underscore');

var {
  StyleSheet,
  View,
} = React;

var Separator = React.createClass({
  displayName: 'Separator',

  render: function() {
    return (
      <View style={styles.container} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 2,
    backgroundColor: '#e9e9e9'
  }
});

module.exports = Separator;
