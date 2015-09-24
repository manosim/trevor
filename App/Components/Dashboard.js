'use strict';

var React = require('react-native');
var _ = require('underscore');

var Loading = require('./Loading');
var AccountsList = require('./AccountsList');

var {
  AlertIOS,
  AsyncStorage,
  StyleSheet,
  Text,
  ListView,
  LinkingIOS,
  View,
  ScrollView,
  TouchableHighlight
} = React;

var Api = require('../Utils/Api');
var AuthStore = require('../Stores/Auth');
var ReposScreen = require('./ReposScreen');

var options = {
  client_id: '1977d96493704415daa0',
  client_secret: '05a3daa3b49f5fc3684b031dcad1862223c2c2fb',
  scope: [
    'user:email', 'read:org', 'repo_deployment',
    'repo:status', 'write:repo_hook'
  ]
};

var Dashboard = React.createClass({
  displayName: 'Dashboard',

  getInitialState: function () {
    return {
      loading: false,
      isLoggedIn: {
        os: AuthStore.isLoggedIn(false),
        pro: AuthStore.isLoggedIn(true)
      }
    };
  },

  _doLogin: function (isPro) {
    var self = this;
    LinkingIOS.addEventListener('url', handleUrl);

    this.setState({
      loading: true
    });

    function handleUrl (event) {
      var url = event.url;
      var raw_code = /code=([^&]*)/.exec(url) || null;
      var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
      var error = /\?error=(.+)$/.exec(url);

      // If there is a code, proceed to get token from github
      if (code) {
        self.requestGithubToken(code, isPro);
      } else if (error) {
        self.setState({
          loading: false
        });
        AlertIOS.alert('Trevor', 'Oops! Something went wrong and we couldn\'t log' +
          'you in. Please try again.');
      }

      options.scope = _.without(options.scope, 'repo');
      LinkingIOS.removeEventListener('url', handleUrl);
    }

    if (isPro) {
      options.scope.push('repo');
    }

    LinkingIOS.openURL([
      'https://github.com/login/oauth/authorize',
      '?client_id=' + options.client_id,
      '&client_secret=' + options.client_secret,
      '&scope=' + options.scope
    ].join(''));
  },

  requestGithubToken: function (code, isPro) {
    var self = this;

    var data = JSON.stringify({
      client_id: options.client_id,
      client_secret: options.client_secret,
      code: code
    });

    Api.getGithubToken(data)
      .then(function (res) {
        AsyncStorage.setItem('tokenGithub', res.access_token).done();
        self.requestTravisToken(res.access_token, isPro);
      });
  },

  requestTravisToken: function (githubToken, isPro) {
    var self = this;

    var data = JSON.stringify({
      github_token: githubToken
    });

    Api.getTravisToken(data, isPro)
      .then(function (res) {
        AsyncStorage.setItem('token' + (isPro ? 'Pro' : 'Os'), res.access_token).done();
        AuthStore.setToken('token' + (isPro ? 'Pro' : 'Os'), res.access_token);
        if (isPro) {
          self.state.isLoggedIn.pro = true;
        } else {
          self.state.isLoggedIn.os = true;
        }

        self.setState({
          loading: false
        });
      });
  },

  render: function() {
    if (this.state.loading) {
      return (
        <Loading text='Accounts' />
      );
    }

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.description}>
          Access Travis CI, simply everywhere
        </Text>

        {!this.state.isLoggedIn.os ? (
          <TouchableHighlight style={styles.loginButton} onPress={() => this._doLogin(false)}>
            <Text style={styles.loginButtonText}>Login to Travis for Open Source</Text>
          </TouchableHighlight> ) : <AccountsList navigator={this.props.navigator} isPro={false} />}

        {!this.state.isLoggedIn.pro ? (
          <TouchableHighlight style={styles.loginButton} onPress={() => this._doLogin(true)}>
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
