'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View
} = React;

var EmptyResults = React.createClass({
  displayName: 'EmptyResults',

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Yey! Nothing to see here!</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 32,
    color: '#40454F',
    paddingVertical: 20,
    paddingHorizontal: 10,
    textAlign: 'center',

  }
});

module.exports = EmptyResults;
