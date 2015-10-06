'use strict';

var _ = require('underscore');
var React = require('react-native');
var {
  AppRegistry,
  AsyncStorage,
  NavigatorIOS,
  StyleSheet,
} = React;

var Dashboard = require('./App/Components/Dashboard');
var Loading = require('./App/Components/Loading');
var AuthStore = require('./App/Stores/Auth');

var Trevor = React.createClass({
  getInitialState: function() {
    return {
      loaded: false
    };
  },

  componentDidMount() {
    this._loadInitialState();
  },

  _loadInitialState() {
    var self = this;

    AsyncStorage.multiGet(['tokenOs', 'tokenPro', 'tokenGithub']).then(function (pairs) {
      _.map(pairs, function (pair) {
        var key = pair[0];
        var value = pair[1];
        if (value) {
          AuthStore[pair[0]] = pair[1];
        }
      });

      AuthStore.eventEmitter.emit('loggedIn');

      self.setState({
        loaded: true
      });
    }).done();
  },

  logOut: function () {
    AuthStore.clear();
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
            title: 'Dashboard',
            component: Dashboard,
            rightButtonTitle: 'Log Out',
            onRightButtonPress: this.logOut
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
