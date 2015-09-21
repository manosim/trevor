'use strict';

var React = require('react-native');
var _ = require('underscore');
var Icon = require('react-native-vector-icons/Octicons');
var moment = require('moment');
require("moment-duration-format");

var {
  ActivityIndicatorIOS,
  StyleSheet,
  Text,
  View,
} = React;

var Reloading = React.createClass({
  displayName: 'Reloading',

  render: function() {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS
          animating={true}
          color="#357389"
          size="large" />
        <Text style={styles.loadingText}>Loading {this.props.text}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    fontSize: 20,
    margin: 15
  }
});

module.exports = Reloading;
