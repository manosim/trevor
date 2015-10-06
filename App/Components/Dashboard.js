'use strict';

var React = require('react-native');
var _ = require('underscore');

var {
  AlertIOS,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} = React;

var Api = require('../Utils/Api');
var AuthStore = require('../Stores/Auth');
var AccountsList = require('./AccountsList');
var Constants = require('../Utils/Constants');
var OAuthView = require('./OAuthView');

var Dashboard = React.createClass({
  displayName: 'Dashboard',

  componentWillMount: function() {
    AuthStore.eventEmitter.addListener('loggedIn', this.refreshAuthState);
  },

  getInitialState: function () {
    return {
      isLoggedIn: {
        os: AuthStore.isLoggedIn(false),
        pro: AuthStore.isLoggedIn(true)
      }
    };
  },

  refreshAuthState: function () {
    console.log('>>>!>!>!>!!>!>!>!>!>!>!>');
    console.log('>>>!>!>!>!!>!>!>!>!>!>!>');
    console.log('>>>!>!>!>!!>!>!>!>!>!>!>');

    this.setState({
      isLoggedIn: {
        os: AuthStore.isLoggedIn(false),
        pro: AuthStore.isLoggedIn(true)
      }
    });
  },

  getAuthUrl: function (isPro) {
    var scopes = Constants.oAuthOptions.scopes;
    if (isPro) {
      scopes.push('repo');
    }

    var authUrl = [
      'https://github.com/login/oauth/authorize',
      '?client_id=' + Constants.oAuthOptions.client_id,
      '&client_secret=' + Constants.oAuthOptions.client_secret,
      '&scope=' + scopes
    ].join('');

    return authUrl;
  },

  _doLoginOs: function () {
    this.doLogin(false);
  },

  _doLoginPro: function () {
    this.doLogin(true);
  },

  doLogin: function (isPro) {
    var authUrl = this.getAuthUrl(isPro);

    this.props.navigator.push({
      title: 'Authentication',
      component: OAuthView,
      passProps: {
        isPro: isPro,
        authUrl: authUrl,
        refreshAuthState: this.refreshAuthState
      }
    });
  },

  render: function() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.description}>
          Access Travis CI, simply everywhere
        </Text>

        {!this.state.isLoggedIn.os ? (
          <TouchableHighlight style={styles.loginButton} onPress={this._doLoginOs}>
            <Text style={styles.loginButtonText}>Login to Travis for Open Source</Text>
          </TouchableHighlight> ) : <AccountsList navigator={this.props.navigator} isPro={false} />}

        {!this.state.isLoggedIn.pro ? (
          <TouchableHighlight style={styles.loginButton} onPress={this._doLoginPro}>
            <Text style={styles.loginButtonText}>Login to Travis Pro</Text>
          </TouchableHighlight> ) : <AccountsList navigator={this.props.navigator} isPro={true} />}

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
