'use strict';

var _ = require('underscore');
var React = require('react-native');
var {
  AppRegistry,
  AsyncStorage,
  NavigatorIOS,
  StyleSheet,
} = React;

var AuthStore = require('./App/Stores/Auth');
var Dashboard = require('./App/Components/Dashboard');
var LatestRepos = require('./App/Components/LatestRepos.js');
var Loading = require('./App/Components/Loading');

var Trevor = React.createClass({
  getInitialState: function() {
    return {
      loaded: false,
      isEitherLoggedIn: AuthStore.isEitherLoggedIn()
    };
  },

  componentDidMount: function() {
    var self = this;

    AuthStore.eventEmitter.addListener('authStateChanged', function () {
      self.setState({
        isEitherLoggedIn: AuthStore.isEitherLoggedIn()
      });

      console.log('(index.ios.js) Is Logged In:', self.state.isEitherLoggedIn);
    });

    this._loadInitialState();
  },

  _loadInitialState() {
    var self = this;

    AsyncStorage.multiGet(['tokenOs', 'tokenPro']).then(function (pairs) {
      _.map(pairs, function (pair) {
        var key = pair[0];
        var value = pair[1];
        if (value) {
          AuthStore[key] = value;
        }
      });

      AuthStore.eventEmitter.emit('authStateChanged');

      self.setState({
        loaded: true
      });
    }).done();
  },

  render: function() {
    if (this.state.loaded) {
      return (
        <NavigatorIOS
          ref="nav"
          style={styles.container}
          barTintColor='#A53230'
          titleTextColor='#FFFFFF'
          tintColor='#FFFFFF'
          initialRoute={{
            title: 'Latest',
            component: LatestRepos
          }} />
      );
    } else {
      return (<Loading text='Trevor' />);
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('Trevor', () => Trevor);

module.exports = Trevor;
