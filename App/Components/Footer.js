'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  TouchableHighlight,
} = React;

var LatestProRepos = require('../Components/LatestProRepos');

var Footer = React.createClass({
  displayName: 'Footer',

  pressButton: function () {
    this.props.navigator.push({
      title: 'Latest Builds',
      component: LatestProRepos
    });
  },

  render: function() {
    return (
      <TouchableHighlight
        style={styles.container}
        underlayColor='#A53230'
        onPress={this.pressButton}>
          <Text style={styles.buttonText}>Latest Builds for Travis Pro</Text>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#40454F',
    height: 42
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    paddingVertical: 12,
    alignSelf: 'center'
  }
});

module.exports = Footer;
