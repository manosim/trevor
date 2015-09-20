'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} = React;

var BuildsScreen = require('./BuildsScreen');

var Trevor = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        barTintColor='#A53230'
        titleTextColor='#FFFFFF'
        tintColor='#FFFFFF'
        initialRoute={{
          title: 'Builds',
          component: BuildsScreen,
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

AppRegistry.registerComponent('Trevor', () => Trevor);

module.exports = Trevor;
