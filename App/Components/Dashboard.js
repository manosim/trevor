'use strict';

var React = require('react-native');
var _ = require('underscore');

var Loading = require('./Loading');

var {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} = React;

var Dashboard = React.createClass({
  displayName: 'Dashboard',

  _pressRow: function (val) {
    console.log(val);
  },

  render: function() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.description}>
          Access Travis CI, simply everywhere
        </Text>
        <TouchableHighlight style={styles.loginButton} onPress={() => this._pressRow('test')}>
          <Text style={styles.loginButtonText}>Login to Travis for Open Source</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  description: {
    fontSize: 20,
    padding: 15,
    textAlign: 'center'
  },
  loginButton: {
    backgroundColor: '#357389',
    margin: 10,
  },
  loginButtonText: {
    fontSize: 16,
    padding: 10,
    color: 'white',
    textAlign: 'center'

  }
});

module.exports = Dashboard;
