/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var _ = require('underscore');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var Trevor = React.createClass({
  getInitialState: function() {
    return {
      loading: false,
      builds: []
    };
  },

  componentWillMount: function() {
    fetch('https://api.travis-ci.org/repos/ekonstantinidis/gitify/builds')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          builds: responseJson
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        {_.map(this.state.builds, function (build) {
          console.log('.......');
          console.log(build.id);
          return <Text>{build.id}</Text>
        })}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('trevor', () => Trevor);
