'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} = React;

var BuildsScreen = require('./App/Components/BuildsScreen');
var ReposScreen = require('./App/Components/ReposScreen');

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
          title: 'Repos',
          component: ReposScreen,
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
