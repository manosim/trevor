'use strict';

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
    this._loadInitialState().done();
  },

  async _loadInitialState() {
    try {
      var tokenOs = await AsyncStorage.getItem('tokenOs');
      if (tokenOs !== null) {
        AuthStore.setToken('tokenOs', tokenOs);
      }

      var tokenPro = await AsyncStorage.getItem('tokenPro');
      if (tokenPro !== null) {
        AuthStore.setToken('tokenPro', tokenPro);
      }

      this.setState({
        loaded: true
      });
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  },

  render: function() {
    if (this.state.loaded) {
      return (<NavigatorIOS
        ref="nav"
        style={styles.container}
        barTintColor='#A53230'
        titleTextColor='#FFFFFF'
        tintColor='#FFFFFF'
        initialRoute={{
          title: 'Dashboard',
          component: Dashboard,
        }}
      />);
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
