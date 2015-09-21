'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} = React;

var Dashboard = require('./App/Components/Dashboard');

var Trevor = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        ref="nav"
        style={styles.container}
        barTintColor='#A53230'
        titleTextColor='#FFFFFF'
        tintColor='#FFFFFF'
        initialRoute={{
          title: 'Dashboard',
          component: Dashboard,
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('Trevor', () => Trevor);

module.exports = Trevor;
