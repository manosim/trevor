'use strict';

var React = require('react-native');

var {
  ActivityIndicatorIOS,
  StyleSheet,
  View
} = React;

var LoadingPull = React.createClass({
  displayName: 'LoadingPull',

  render: function() {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS
          animating={true}
          color="#357389" />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

module.exports = LoadingPull;
